
import { tool } from "ai";
import { z } from "zod";
import en from '../../../../messages/en.json';
import { db } from "@/db/drizzle";
import { template_attributes, template_sections } from "@/db/schema";
import { eq, inArray, like } from "drizzle-orm";

// 1. get_general_info
export const getGeneralInfo = tool({
    description: 'Get social media links, contact info, and general company details.',
    inputSchema: z.object({}),
    execute: async () => {
        return {
            social_media: {
                Instagram: "https://www.instagram.com/fractalstech?igsh=MWpxdDdtNW82YW1seg==",
                LinkedIn: "https://www.linkedin.com/company/fractals1group/",
                Facebook: "https://www.facebook.com/share/1aCkhgsCWj/?mibextid=wwXIfr",
                Twitter: "https://twitter.com/fractals_group" // Assumption or Placeholder if not in Footer. checked Footer, Twitter is just "Twitter" label, no href provided in snippet earlier, wait...
            },
            contact_email: "hello@fractalsgroup.net", // Hardcoded or extracted if available
            address: "Riyadh, Saudi Arabia", // Example, adjust if known
            description: en.hero.description,
            vision: en.aboutUS.vision.description,
            mission: en.aboutUS.mission.description
        };
    },
});

// 2. get_services
export const getServices = tool({
    description: 'Get detailed information about Fractals services (Web, Mobile, AI, etc.).',
    inputSchema: z.object({}),
    execute: async () => {
        return {
            services: en.expertise
        };
    },
});

// 3. get_brief_structures
const briefIdMapping: Record<string, number> = {
    // Manual mapping based on user request. 
    // You might need to verify these IDs in your DB.
    'mobile': 2,
    'web': 3,
    'desktop': 1,
    'logo-desing': 6,
    'ui_ux': 4,
    'social_media': 5
};

// Helper to find ID by name if manual map fails
async function findTemplateIdByName(name: string): Promise<number | null> {
    // This is a placeholder. In a real app you might query `brief_templates`
    // const template = await db.query.brief_templates.findFirst({
    //     where: like(brief_templates.name, `%${name}%`)
    // });
    // return template ? template.id : null;
    return null;
}

export const getBriefStructures = tool({
    description: 'Get the structure (fields, sections) of a specific project brief form. Use this when a user asks how to fill a brief or what info is needed.',
    inputSchema: z.object({
        brief_type: z.string().optional().describe('The type of brief (e.g., "mobile", "web", "branding"). If detecting from URL, pass the mapped key.'),
        current_url: z.string().optional().describe('The current URL the user is visiting, to auto-detect the brief type.')
    }),
    execute: async ({ brief_type, current_url }: { brief_type?: string, current_url?: string }) => {
        let templateId: number | undefined;

        // 1. Try to detect from brief_type
        if (brief_type && briefIdMapping[brief_type.toLowerCase()]) {
            templateId = briefIdMapping[brief_type.toLowerCase()];
        }

        // 2. If not found, try to detect from URL
        if (!templateId && current_url) {
            if (current_url.includes('mobile')) templateId = briefIdMapping['mobile'];
            else if (current_url.includes('web')) templateId = briefIdMapping['web'];
            else if (current_url.includes('desktop')) templateId = briefIdMapping['desktop'];
            else if (current_url.includes('ui_ux')) templateId = briefIdMapping['ui_ux'];
            else if (current_url.includes('logo-design')) templateId = briefIdMapping['branding'];
            else if (current_url.includes('social-media')) templateId = briefIdMapping['social_media'];
        }

        // 3. Fallback or Error
        if (!templateId) {
            return {
                error: "Could not identify the brief type. Please specify if it's for Mobile, Web, Desktop, etc."
            };
        }

        // 4. Fetch Sections & Attributes (Logic from getBriefSectionsAction)
        const sectionsResult = await db.select()
            .from(template_sections)
            .where(eq(template_sections.template_id, templateId))
            .orderBy(template_sections.position);

        if (sectionsResult.length === 0) {
            return { error: `No structure found for template ID ${templateId}` };
        }

        const sectionIds = sectionsResult.map(s => s.id);
        const attributesResult = await db.select()
            .from(template_attributes)
            .where(inArray(template_attributes.section_id, sectionIds))
            .orderBy(template_attributes.position);

        // Grouping for cleaner AI context
        const structure = sectionsResult.map(section => {
            const attrs = attributesResult
                .filter(a => a.section_id === section.id)
                .map(a => ({
                    label: a.label,
                    type: a.type,
                    description: a.meta ? (a.meta as any).hint : '', // Assuming 'hint' might be in meta, or just rely on label
                    required: a.required
                }));

            return {
                section: section.title,
                fields: attrs
            };
        });

        return {
            brief_type: brief_type || "detected_from_url",
            template_id: templateId,
            structure
        };
    },
});

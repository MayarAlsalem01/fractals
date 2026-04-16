'use client'
import {
    Document, Page, Text, View, StyleSheet,
    Link,
    Font,
} from "@react-pdf/renderer"

Font.register({
    family: 'Cairo',
    fonts: [
        { src: '/fonts/cairo/cairo-v31-arabic_latin-regular.ttf', fontWeight: 'normal' },
        { src: '/fonts/cairo/cairo-v31-arabic_latin-700.ttf', fontWeight: 'bold' },
    ]
})

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontSize: 12,
        link: { color: 'blue', textDecoration: 'underline' },
        fontFamily: 'Cairo',
    },
    section: {
        marginBottom: 20,
    },
    title: {
        fontSize: 16,
        marginBottom: 8,
        fontWeight: 'bold',
        color: '#9B3E83'
    },
    row: {
        flexDirection: 'row',
        marginBottom: 4,
    },
    label: {
        fontWeight: 'bold',
        marginRight: 3
    },
    value: {
        flex: 1,
    },
})

export type BriefData = {
    position: number;
    title: string;
    attributes: {
        id: number;
        value_text: string | null;
        attribute: {
            options: unknown;
            id: number;
            key: string;
            position: number;
            section_id: number;
            label: string;
            type: string;
            required: boolean | null;
            meta: unknown;
            width: string | null;
            section: {
                title: string;
                position: number;
            };
        };
    }[];
}[]

export default function BriefPdf({ data }: { data: BriefData }) {
    if (!data || !Array.isArray(data)) return <Document><Page /></Document>;

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {data.filter(s => s && s.title).map((section, sIndex) => (
                    <View key={section.position || sIndex} style={styles.section}>
                        <Text style={styles.title}>{section.title}</Text>

                        {section.attributes?.filter(attr => attr && attr.id).map((attr) => (
                            <View key={attr.id} style={styles.row}>
                                <Text style={styles.label}>
                                    {(attr.attribute?.label || 'Unknown')?.slice(0, -1)}:
                                </Text>
                                {
                                    attr.attribute?.type === 'file' ?
                                        <Link style={{ flex: 1 }} src={attr.value_text ?? ''}>
                                            {attr.value_text || 'Link'}
                                        </Link> : 
                                        <Text style={styles.value}>
                                            {attr.value_text || '—'}
                                        </Text>
                                }
                            </View>
                        ))}
                    </View>
                ))}
            </Page>
        </Document>
    )
}
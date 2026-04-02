'use client'
import getBriefAttrubiteValuesByIdAction from "@/features/breifs/actions/getBriefAttrubiteValuesByIdAction"
import useGetBriefAttrubiteValuesById from "@/hooks/useGetBriefAttrubiteValuesById"
import {
    Document, Page, Text, View, StyleSheet,
    Link,
    Font,
} from "@react-pdf/renderer"
import { useEffect, useState } from "react"
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
        // width: 150,
        fontWeight: 'bold',
        marginRight: 3

    },
    value: {
        flex: 1,
    },
})
type x = {
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
export default function BriefPdf({ briefId }: { briefId: number }) {
    const [values, setValues] = useState<x | undefined>(undefined)
    useEffect(() => {
        async function getDate() {
            const data = await getBriefAttrubiteValuesByIdAction(briefId)
            setValues(data)
        }
        if (!values)
            getDate()
    }, [values])
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {values?.map((section) => (
                    <View key={section.position} style={styles.section}>
                        <Text style={styles.title}>{section.title}</Text>

                        {section.attributes.map((attr) => (
                            <View key={attr.id} style={styles.row}>
                                <Text style={styles.label}>
                                    {attr.attribute.label.slice(0, -1)}:

                                </Text>
                                {
                                    attr.attribute.type === 'file' ?
                                        // break the line if it is a file 


                                        <Link style={{ flex: 1 }} src={attr.value_text ?? ''}>
                                            {attr.value_text}
                                        </Link> : <Text style={styles.value}>
                                            {attr.value_text || '—'}
                                        </Text>
                                }

                            </View>
                        ))}
                    </View>
                ))}
            </Page>
            <div>

            </div>
        </Document>
    )
}
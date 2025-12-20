// app/api/generate-pdf/route.js (or pages/api/generate-pdf.js)
import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

export async function GET(request: NextRequest) {
    const url = new URL(request.url);
    const briefId = Number(url.searchParams.get('briefId') ?? undefined);
    if (!briefId)
        return new NextResponse(JSON.stringify({ message: 'Resource Not Found' }), {
            status: 404,
            headers: {
                'Content-Type': 'application/json',
            },
        });

    const pdfDoc = await PDFDocument.create();
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const fontSize = 30;

    page.drawText('Creating PDFs in Next.js with pdf-lib!', {
        x: 50,
        y: height - 4 * fontSize,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0.53, 0.71),
    });
    page.drawText('hi', {
        y: height - 4 * fontSize,

        size: fontSize,
        font: timesRomanFont,
    });

    const pdfBytes = await pdfDoc.save();

    // Return the PDF as a downloadable file
    return new Response(pdfBytes as any, {
        headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename="example.pdf"',
        },
    });
}

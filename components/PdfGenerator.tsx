import { PDFDocument, rgb, StandardFonts, PDFFont } from "pdf-lib";

// Helper function to wrap text
const wrapText = (
  text: string,
  font: PDFFont,
  fontSize: number,
  maxWidth: number
) => {
  const words = text.split(" ");
  const lines = [];
  let currentLine = "";

  for (const word of words) {
    const testLine = currentLine ? currentLine + " " + word : word;
    const width = font.widthOfTextAtSize(testLine, fontSize);
    if (width < maxWidth) {
      currentLine = testLine;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) {
    lines.push(currentLine);
  }
  return lines;
};

interface SiteSettings {
  logoUrl?: string;
  mainOffice?: string;
  email?: string;
  websiteUrl?: string;
  contactNo1?: string;
}

export const generateProjectBriefPDF = async (siteSettings: SiteSettings) => {
  if (!siteSettings) {
    console.error("No site settings provided");
    return;
  }

  const pdfDoc = await PDFDocument.create();
  let page = pdfDoc.addPage([595, 842]); // A4 size
  const { width, height } = page.getSize();
  const margin = 50;
  let y = height - margin;

  // Embed Fonts
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const italicFont = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // Define Colors
  const goldColor = rgb(0.83, 0.68, 0.22); // #d4af37
  const navyColor = rgb(0.05, 0.07, 0.13); // #0d1321
  const silverColor = rgb(0.75, 0.75, 0.75); // #c0c0c0
  const grayColor = rgb(0.3, 0.3, 0.3);

  // --- Header with background ---
  const headerHeight = 100;
  page.drawRectangle({
    x: 0,
    y: height - headerHeight,
    width,
    height: headerHeight,
    color: navyColor,
  });

  // Decorative diagonal lines
  for (let i = 0; i < width + height; i += 15) {
    page.drawLine({
      start: { x: i, y: height - headerHeight },
      end: { x: i - 100, y: height },
      color: goldColor,
      thickness: 0.5,
      opacity: 0.15,
    });
  }

  // Logo and Company Name
  if (siteSettings?.logoUrl) {
    try {
      const response = await fetch(siteSettings.logoUrl);
      if (response.ok) {
        const logoBytes = await response.arrayBuffer();
        const logoImage = await pdfDoc.embedPng(logoBytes);
        const logoDims = logoImage.scale(0.12 * 0.8); // scaled smaller

        const logoX = margin;
        const logoY = height - 10 - logoDims.height;
        page.drawImage(logoImage, {
          x: logoX,
          y: logoY,
          width: logoDims.width,
          height: logoDims.height,
        });

        page.drawText("Maldonite", {
          x: logoX + logoDims.width + 8,
          y: logoY + logoDims.height / 2 - 10,
          size: 28,
          font: boldFont,
          color: goldColor,
        });
      }
    } catch (error) {
      console.error("Error fetching logo:", error);
    }
  }

  // Contact Info
  const contactInfo = `${siteSettings.mainOffice}\n${siteSettings.email}\n${siteSettings.websiteUrl}\n +91 ${siteSettings.contactNo1}`;
  const contactInfoLines = contactInfo.split("\n");
  const contactInfoX = width - margin;
  let contactInfoY = height - headerHeight + 15;

  for (const line of contactInfoLines) {
    const textWidth = regularFont.widthOfTextAtSize(line, 10);
    page.drawText(line, {
      x: contactInfoX - textWidth,
      y: contactInfoY,
      size: 10,
      font: regularFont,
      color: silverColor,
    });
    contactInfoY += 14;
  }

  y = height - headerHeight - 50;

  // --- Main Title ---
  page.drawText("Project Brief", {
    x: margin,
    y: y,
    size: 26,
    font: boldFont,
    color: navyColor,
  });
  y -= 25;

  page.drawLine({
    start: { x: margin, y: y },
    end: { x: width - margin, y: y },
    color: goldColor,
    thickness: 1,
    opacity: 0.7,
  });
  y -= 30;

  // --- Content Sections ---
  const contentSections = [
    {
      title: "1. Strategic Vision",
      text: "We will develop a high-performance website that serves as a powerful lead generation tool and a showcase for your brand. Our focus is on creating an exceptional user experience and implementing robust SEO strategies to ensure you stand out online.",
    },
    {
      title: "2. Our Expertise",
      list: [
        {
          bold: "Website Design & Development:",
          normal:
            "We craft stunning, high-performance websites that are not only beautiful but are also fully responsive and optimized for search engines to drive organic traffic and convert visitors into customers.",
        },
        {
          bold: "SaaS App Development:",
          normal:
            "From MVP to scalable SaaS platforms, we build robust, secure, and user-friendly applications with modern tech stacks and seamless cloud support.",
        },
        {
          bold: "Go-to-Market & Startup Tech Partner:",
          normal:
            "From idea to launch, we act as your technical co-founder and product partner, providing strategic guidance and technical execution to help your startup succeed.",
        },
      ],
    },
    {
      title: "3. Core Features",
      list: [
        {
          bold: "Responsive & Modern UI:",
          normal:
            "A sleek, intuitive, and fully responsive user interface with built-in dark mode support for an enhanced user experience.",
        },
        {
          bold: "E-commerce Workflow:",
          normal:
            "A seamless shopping cart experience with secure payment integration and automated PDF invoice generation.",
        },
        {
          bold: "Admin Dashboard:",
          normal:
            "A comprehensive, user-friendly admin panel for effortless product and content management, giving you full control.",
        },
      ],
    },
    {
      title: "4. Your Deliverables",
      list: [
        {
          bold: "A fully responsive,",
          normal: " professionally designed, and SEO-optimized website.",
        },
        {
          bold: "A complete Next.js codebase,",
          normal: " providing a modern and scalable foundation.",
        },
        {
          bold: "A user-friendly admin dashboard",
          normal: " for managing all your content.",
        },
        {
          bold: "Ongoing support and maintenance",
          normal: " to ensure long-term performance.",
        },
      ],
    },
  ];

  for (const section of contentSections) {
    if (y < margin + 60) {
      page = pdfDoc.addPage([595, 842]);
      y = height - margin;
    }

    page.drawText(section.title, {
      x: margin,
      y: y,
      size: 16,
      font: boldFont,
      color: navyColor,
    });
    y -= 20;

    if (section.text) {
      const lines = wrapText(section.text, regularFont, 10, width - margin * 2);
      for (const line of lines) {
        page.drawText(line, {
          x: margin,
          y: y,
          size: 10,
          font: regularFont,
          color: grayColor,
        });
        y -= 14;
      }
      y -= 15;
    }

    if (section.list) {
      const bulletX = margin + 10;
      for (const item of section.list) {
        page.drawText("•", {
          x: margin,
          y: y,
          size: 10,
          font: regularFont,
          color: goldColor,
        });

        const boldWidth = boldFont.widthOfTextAtSize(item.bold, 10);
        page.drawText(item.bold, {
          x: bulletX,
          y: y,
          size: 10,
          font: boldFont,
          color: grayColor,
        });

        const normalTextLines = wrapText(
          item.normal,
          regularFont,
          10,
          width - (bulletX + boldWidth) - margin
        );

        let currentY = y;
        for (const [index, line] of normalTextLines.entries()) {
          const textX = index === 0 ? bulletX + boldWidth : bulletX;
          page.drawText(line, {
            x: textX,
            y: currentY,
            size: 10,
            font: regularFont,
            color: grayColor,
          });
          currentY -= 14;
        }
        y = currentY - 5;
      }
    }
  }

  // --- Footer ---
  const pages = pdfDoc.getPages();
  for (const [i, p] of pages.entries()) {
    p.drawRectangle({
      x: 0,
      y: 0,
      width,
      height: 40,
      color: navyColor,
    });
    p.drawText(`Page ${i + 1} of ${pages.length} | Maldonite`, {
      x: margin,
      y: 15,
      size: 10,
      font: italicFont,
      color: silverColor,
    });
  }

  // Save & Download
  const pdfBytes = await pdfDoc.save();
  const buffer = new ArrayBuffer(pdfBytes.length);
  const view = new Uint8Array(buffer);
  view.set(pdfBytes, 0);
  const blob = new Blob([buffer], { type: "application/pdf" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "Project-Brief-Maldonite.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

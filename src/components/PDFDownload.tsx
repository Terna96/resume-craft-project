import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import { ResumeData } from '@/types/resume';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

interface PDFDownloadProps {
  data: ResumeData;
  elementId: string;
}

export function PDFDownload({ data, elementId }: PDFDownloadProps) {
  const [downloading, setDownloading] = useState(false);

  const downloadPDF = async () => {
    setDownloading(true);
    
    try {
      // Dynamically import html2pdf.js to reduce initial bundle size
      const html2pdf = (await import('html2pdf.js')).default;
      
      const element = document.getElementById(elementId);
      if (!element) {
        throw new Error('Resume preview element not found');
      }

      const opt = {
        margin: [0.5, 0.5, 0.5, 0.5],
        filename: `${data.personalInfo.fullName || 'resume'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
        },
        jsPDF: {
          unit: 'in',
          format: 'letter',
          orientation: 'portrait'
        }
      };

      await html2pdf().from(element).set(opt).save();
      
      toast({
        title: "PDF Downloaded",
        description: "Your resume has been downloaded successfully.",
      });
    } catch (error: any) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Download Failed",
        description: "There was an error generating your PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDownloading(false);
    }
  };

  return (
    <Button 
      onClick={downloadPDF} 
      disabled={downloading}
      className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
    >
      {downloading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Generating PDF...
        </>
      ) : (
        <>
          <Download className="w-4 h-4 mr-2" />
          Download PDF
        </>
      )}
    </Button>
  );
}
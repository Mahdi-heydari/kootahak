export interface TermsSection {
  id: string;
  title: string;
  paragraphs: string[];
  items?: string[];
}

export interface TermsContent {
  heading: {
    before: string;
    highlight: string;
    description: string;
  };
  sections: TermsSection[];
}

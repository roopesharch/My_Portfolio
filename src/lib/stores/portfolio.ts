import { writable } from 'svelte/store';

// --- INTERFACES ---
interface Social {
    url: string;
    platform: string;
}

interface Project {
    title: string;
    date: string;
    description: string;
    link: string;
    image: string;
    tags: string[];
}

interface Experience {
    role: string;
    company: string;
    tenure: string;
    one_liner: string;
    responsibilities: string[];
}

interface Certification {
    name: string;
    provider: string;
    year: number;
    link: string;
}

interface PortfolioData {
    about: {
        name: string;
        roles: string[];
        objective: string;
        resume_link: string;
    };
    skills: Record<string, Record<string, string[]>>;
    contact: {
        email: string;
        phone: string;
        location: string;
        socials: Social[];
    };
    projects: Project[];
    experience: Experience[];
    certifications: Certification[];
    languages: Record<string, string[]>;
}

// --- STORE DEFINITION ---
export const portfolioData = writable<PortfolioData | null>(null);
export const isLoading = writable(true);

export async function fetchPortfolioData(): Promise<void> {
    try {
        isLoading.set(true);
        const SUPABASE_URL = 'https://irkywlnfizmlzkltbepk.supabase.co';
        const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlya3l3bG5maXptbHprbHRiZXBrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0NjM1ODIsImV4cCI6MjA4ODAzOTU4Mn0.10xYnVeD4SEdvpoCs9-ZU1cJRv8iCGLt5ELgbSWoFXE';

        const response = await fetch(
            `${SUPABASE_URL}/rest/v1/portfolio_metadata?category=eq.master_data&select=content`,
            {
                method: 'GET',
                headers: {
                    'apikey': SUPABASE_ANON_KEY,
                    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        if (!response.ok) throw new Error("Failed to fetch portfolio data");

        const result = await response.json();
        
        if (result && result.length > 0) {
            // result[0].content contains the JSON structure you provided
            portfolioData.set(result[0].content);
        }
    } catch (err) {
        console.error("❌ Database fetch failed:", err);
    } finally {
        isLoading.set(false);
    }
}
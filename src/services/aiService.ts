import { CreativeProfile, JobOpportunity, MatchResult, MatchReason } from '../types';
import { creativeProfessions, skillDatabase } from '../data/professions';

// Simulate AI classification and metadata generation
export class AIService {
  // Simulate Bedrock text classification
  static async classifyPortfolio(portfolioText: string): Promise<{
    profession: string;
    confidence: number;
    extractedSkills: string[];
  }> {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simple keyword-based classification for demo
    const text = portfolioText.toLowerCase();
    let bestMatch = creativeProfessions[0];
    let maxScore = 0;
    
    creativeProfessions.forEach(profession => {
      const keywords = profession.name.toLowerCase().split(/[\s-]/);
      let score = 0;
      
      keywords.forEach(keyword => {
        if (text.includes(keyword)) score += 2;
        if (text.includes(profession.category)) score += 1;
      });
      
      if (score > maxScore) {
        maxScore = score;
        bestMatch = profession;
      }
    });

    // Extract skills based on keywords
    const extractedSkills = skillDatabase.filter(skill => 
      text.includes(skill.toLowerCase())
    ).slice(0, 6);

    return {
      profession: bestMatch.name,
      confidence: Math.min(0.95, Math.max(0.6, maxScore / 10)),
      extractedSkills
    };
  }

  // Simulate metadata generation
  static async generateMetadata(portfolioText: string, profession: string): Promise<{
    bio: string;
    tags: string[];
    sampleProjects: string[];
  }> {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const templates = {
      'Illustrator': {
        bio: 'Creative illustrator specializing in digital and traditional art with unique Indonesian cultural influences.',
        tags: ['Digital Art', 'Traditional Media', 'Cultural Design', 'Brand Identity', 'Editorial'],
        projects: [
          'Brand mascot design for Indonesian startup',
          'Traditional batik pattern modernization project',
          'Children\'s book illustration series'
        ]
      },
      'Motion Editor': {
        bio: 'Professional motion editor creating engaging visual stories through dynamic video content.',
        tags: ['Motion Graphics', 'Video Editing', 'Visual Storytelling', 'Brand Content', 'Social Media'],
        projects: [
          'Product launch video with motion graphics',
          'Social media campaign video series',
          'Corporate presentation animation'
        ]
      },
      'UI/UX Designer': {
        bio: 'User-focused designer creating intuitive digital experiences for Indonesian market.',
        tags: ['User Experience', 'Interface Design', 'Mobile Design', 'Prototyping', 'User Research'],
        projects: [
          'E-commerce app redesign for local marketplace',
          'Banking app user experience optimization',
          'Government service digital transformation'
        ]
      },
      'Sound Designer': {
        bio: 'Audio specialist creating immersive soundscapes and audio experiences.',
        tags: ['Sound Design', 'Audio Production', 'Music Composition', 'Post Production', 'Interactive Audio'],
        projects: [
          'Podcast intro and outro sound design',
          'Mobile game audio implementation',
          'Documentary film sound design'
        ]
      },
      'Batik Motif Designer': {
        bio: 'Traditional arts specialist merging heritage batik techniques with contemporary design.',
        tags: ['Batik Design', 'Traditional Arts', 'Pattern Creation', 'Cultural Heritage', 'Textile Design'],
        projects: [
          'Modern batik collection for fashion brand',
          'Corporate gift batik pattern design',
          'Cultural exhibition batik artwork'
        ]
      }
    };

    const template = templates[profession as keyof typeof templates] || templates['Illustrator'];
    
    return {
      bio: template.bio,
      tags: template.tags,
      sampleProjects: template.projects
    };
  }

  // Simulate embedding generation
  static generateEmbedding(text: string): number[] {
    // Create a simple hash-based embedding simulation
    const embedding = new Array(384).fill(0);
    const words = text.toLowerCase().split(/\W+/);
    
    words.forEach((word, index) => {
      const hash = this.simpleHash(word);
      embedding[hash % 384] += 1 / (index + 1);
    });

    // Normalize
    const magnitude = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0));
    return embedding.map(val => val / (magnitude || 1));
  }

  private static simpleHash(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }

  // Simulate semantic matching
  static async performMatching(
    profile: CreativeProfile, 
    jobs: JobOpportunity[]
  ): Promise<MatchResult[]> {
    await new Promise(resolve => setTimeout(resolve, 800));

    return jobs.map(job => {
      const semanticScore = this.calculateSemanticSimilarity(
        profile.embedding || [], 
        job.embedding || []
      );
      
      const skillOverlap = this.calculateSkillOverlap(profile.skills, job.requiredSkills);
      const availabilityScore = this.getAvailabilityScore(profile.availability);
      const locationBonus = profile.location.toLowerCase().includes(job.location.toLowerCase()) ? 0.1 : 0;

      const totalScore = (
        semanticScore * 0.4 +
        skillOverlap * 0.35 +
        availabilityScore * 0.15 +
        locationBonus * 0.1
      );

      const reasons: MatchReason[] = [
        {
          type: 'semantic_similarity',
          value: semanticScore,
          description: `Portfolio content aligns with job requirements (${(semanticScore * 100).toFixed(0)}% match)`
        },
        {
          type: 'skill_overlap',
          value: skillOverlap,
          description: `${Math.round(skillOverlap * profile.skills.length)} matching skills found`
        },
        {
          type: 'availability',
          value: availabilityScore,
          description: `Available ${profile.availability.replace('_', ' ')}`
        }
      ];

      if (locationBonus > 0) {
        reasons.push({
          type: 'location',
          value: locationBonus * 10,
          description: 'Located in same area as project'
        });
      }

      return {
        profile,
        job,
        score: Math.min(1, totalScore),
        reasons: reasons.filter(r => r.value > 0)
      };
    }).sort((a, b) => b.score - a.score);
  }

  private static calculateSemanticSimilarity(embedding1: number[], embedding2: number[]): number {
    if (embedding1.length === 0 || embedding2.length === 0) return Math.random() * 0.3 + 0.4;
    
    let dotProduct = 0;
    let norm1 = 0;
    let norm2 = 0;
    
    for (let i = 0; i < Math.min(embedding1.length, embedding2.length); i++) {
      dotProduct += embedding1[i] * embedding2[i];
      norm1 += embedding1[i] * embedding1[i];
      norm2 += embedding2[i] * embedding2[i];
    }
    
    const magnitude = Math.sqrt(norm1) * Math.sqrt(norm2);
    return magnitude > 0 ? Math.abs(dotProduct / magnitude) : 0;
  }

  private static calculateSkillOverlap(skills1: string[], skills2: string[]): number {
    const set1 = new Set(skills1.map(s => s.toLowerCase()));
    const set2 = new Set(skills2.map(s => s.toLowerCase()));
    const intersection = [...set1].filter(x => set2.has(x));
    return intersection.length / Math.max(skills1.length, skills2.length, 1);
  }

  private static getAvailabilityScore(availability: string): number {
    const scores = {
      'immediate': 1.0,
      'within_week': 0.8,
      'within_month': 0.6,
      'busy': 0.2
    };
    return scores[availability as keyof typeof scores] || 0.5;
  }
}
export interface Quiz {
    id: number; // Unique identifier for the quiz
    title: string; // Title of the quiz
    description: string; // Description of the quiz
    teacher_id: number; // ID of the teacher who created the quiz
    created_at: string; // Optional: Date when the quiz was created
  }
import { PaginationParams } from "@/core/repositories/pagination-params";
import { QuestionRepository } from "@/domain/forum/application/repositories/question-repository";
import { Question } from "@/domain/forum/enterprise/entities/question";

export class InMemoryQuestionRepository implements QuestionRepository{
  async findManyRecent({page}: PaginationParams): Promise<Question[]> {
    const questions = this.items.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice((page - 1) * 20, page * 20)
    
    return questions
  }

  async save(question: Question): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === question.id)

    this.items[itemIndex] = question
  }

  async findById(id: string): Promise<Question | null> {
    const question = this.items.find(item => item.id.toString() === id)
    
    if (!question) {
      return null
    }

    return question
  }

  async delete(question: Question): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === question.id)
    
    this.items.splice(itemIndex, 1)
  }

  public items: Question[] = []

  async findBySlug(slug: string): Promise<Question | null> {
    const question = this.items.find(item => item.slug.value === slug)
    
    if (!question) {
      return null
    }

    return question
  }

  async create(question: Question): Promise<void>{
    this.items.push(question)
  }
}
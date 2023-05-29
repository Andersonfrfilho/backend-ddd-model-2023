import { PaginationParams } from "@/core/repositories/pagination-params";
import { QuestionCommentsRepository } from "@/domain/forum/application/repositories/question-comments-repository";
import { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment";

export class InMemoryQuestionCommentsRepository implements QuestionCommentsRepository{
  async findManyByQuestionId(questionId: string, {page}: PaginationParams): Promise<QuestionComment[]> {
    const questions = this.items.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice((page - 1) * 20, page * 20)
    
    return questions
  }

  async findById(id: string): Promise<QuestionComment | null> {
    const answer = this.items.find(item => item.id.toString() === id)
    
    if (!answer) {
      return null
    }

    return answer
  }

  async delete(questionComment: QuestionComment): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === questionComment.id)
    
    this.items.splice(itemIndex, 1)
  }

  public items: QuestionComment[] = []

  async create(questioncomments: QuestionComment): Promise<void>{
    this.items.push(questioncomments)
  }
}
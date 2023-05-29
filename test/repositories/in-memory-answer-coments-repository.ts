import { PaginationParams } from "@/core/repositories/pagination-params";
import { AnswerCommentsRepository } from "@/domain/forum/application/repositories/answer-comments-repository";
import { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment";

export class InMemoryAnswerCommentsRepository implements AnswerCommentsRepository{
  async findManyByAnswerId(answerId: string, {page}: PaginationParams): Promise<AnswerComment[]> {
    const answers = this.items.filter(item=>item.answerId.toString()===answerId).slice((page - 1) * 20, page * 20)
    
    return answers
  }

  public items: AnswerComment[] = []

  async findById(id: string): Promise<AnswerComment | null> {
    const answer = this.items.find(item => item.id.toString() === id)
    
    if (!answer) {
      return null
    }

    return answer
  }

  async delete(answerComment: AnswerComment): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === answerComment.id)
    
    this.items.splice(itemIndex, 1)
  }

  public items: AnswerComment[] = []

  async create(answercomments: AnswerComment): Promise<void>{
    this.items.push(answercomments)
  }
}
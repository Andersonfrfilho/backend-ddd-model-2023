import { QuestionRepository } from '../repositories/question-repository'
import { Question } from '../../enterprise/entities/question'

interface FetchRecentQuestionUseCaseRequest {
  page: number
}

interface FetchRecentQuestionUseCaseResponse {
  question: Question[]
}

export class FetchRecentQuestionBySlugUseCase {
  constructor(private questionRepository: QuestionRepository) {}
  async execute({
    page
  }: FetchRecentQuestionUseCaseRequest): Promise<FetchRecentQuestionUseCaseResponse> {
    const question = await this.questionRepository.findManyRecent({page})

    return {
      question,
    }
  }
}

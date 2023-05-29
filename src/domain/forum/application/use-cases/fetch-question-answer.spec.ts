import { expect, test } from 'vitest'
import { InMemoryQuestionRepository } from 'test/repoisitories/in-memory-question-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { Question } from '../../enterprise/entities/question'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeQuestion } from 'test/factories/make-question'
import { FetchRecentQuestionUseCase } from './fetch-recent-question'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'

let inMemoryAnswerRepository: InMemoryQuestionRepository
let sut: GetQuestionBySlugUseCase
describe('Fetch Question Answer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new FetchRecentQuestionUseCase(inMemoryAnswerRepository)
  })
  test('should be able to fetch recent questions', async () => {
    await inMemoryAnswerRepository.create(makeAnswer({ questionId: new UniqueEntityID('question-id') }))
    await inMemoryAnswerRepository.create(makeAnswer({ questionId: new UniqueEntityID('question-id') }))
    await inMemoryAnswerRepository.create(makeAnswer({ questionId: new UniqueEntityID('question-id') }))
    const { awnsers } = await sut.execute({
      page: 1,
      questionId: 'question-1'
    })

    expect(awnsers).toEqual([
      expect.objectContaining({   })
    ])
  })

  test('should be able to fetch paginated question answers', async () => {
    for (let i = 1; i <= 22; i++){
      await inMemoryAnswerRepository.create(makeQuestion())
    }
    const { questions } = await sut.execute({
      page:2
    })
    expect(awnsers).toEqual([
      expect.objectContaining({   })
    ])
  })
})

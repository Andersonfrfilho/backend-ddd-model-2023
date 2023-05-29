import { expect, test } from 'vitest'
import { InMemoryQuestionRepository } from 'test/repoisitories/in-memory-question-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { Question } from '../../enterprise/entities/question'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeQuestion } from 'test/factories/make-question'
import { FetchRecentQuestionUseCase } from './fetch-recent-question'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: GetQuestionBySlugUseCase
describe('Fetch Recent Questions', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new FetchRecentQuestionUseCase(inMemoryQuestionRepository)
  })
  test('should be able to fetch recent questions', async () => {
    await inMemoryQuestionRepository.create(makeQuestion({ createdAt: new Date(2022, 0, 20) }))
    await inMemoryQuestionRepository.create(makeQuestion({ createdAt: new Date(2022, 0, 18) }))
    await inMemoryQuestionRepository.create(makeQuestion({ createdAt: new Date(2022, 0, 23) }))
    const { questions } = await sut.execute({
      page: 1
    })

    expect(questions).toEqual([
      expect.objectContaining({  createdAt: new Date(2022, 0, 23) })
    ])
  })
})

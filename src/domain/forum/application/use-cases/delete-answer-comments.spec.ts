import { expect, test } from 'vitest'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-coments-repository'
import { CommentOnAnswerUseCase } from './comment-on-answer'
import { makeAnswer } from 'test/factories/make-answer'
import { DeleteAnswerCommentUseCase } from './delete-answer-comment'
import { makeAnswerComment } from 'test/factories/make-answer-comment'

let inMemoryAnswerCommentRepository: InMemoryAnswerCommentsRepository
let sut: DeleteAnswerCommentUseCase

describe('Delete Answer Comment', () => {
  beforeEach(() => {
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentsRepository()
    sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentRepository)
  })

  test('should be delete to comment on answer', async () => {
    const answer = makeAnswerComment()

    await inMemoryAnswerRepository.create(answer)

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: answer.authorId.toString(),
    })

    expect(inMemoryAnswerRepository.items).toHaveLength(0)
  })

  test('should not be delete to comment on answer', async () => {
    const answer = makeAnswerComment()

    await inMemoryAnswerRepository.create(answer)

    const result = await sut.execute({
      answerCommentId: answer.id.toString(),
      authorId: 'other-author',
    })

    expect(inMemoryAnswerRepository.items).toHaveLength(0)
  })
})

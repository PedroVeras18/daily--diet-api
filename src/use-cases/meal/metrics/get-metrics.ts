import { UsersRepository } from '@/repositories/users-repository'
import { UserNotFoundError } from '../../errors/user/user-not-found-error'
import { MealsRepository } from '@/repositories/meals-repository'

interface GetMetricsUseCaseRequest {
  userId: string
}

export interface GetMetricsUseCaseResponse {
  totalMealsRecorded: number
  totalMealsInDiet: number
  totalMealsOutsideDiet: number
  bestSequenceMealsWithinDiet: number
}

export class GetMetricsUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private mealsRepository: MealsRepository,
  ) {}

  async execute({
    userId,
  }: GetMetricsUseCaseRequest): Promise<GetMetricsUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new UserNotFoundError()
    }

    const metrics = await this.mealsRepository.getMetrics(user.id)

    return metrics
  }
}

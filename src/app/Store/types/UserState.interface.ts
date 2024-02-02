import { UserDto } from "src/app/core/models/user/UserDto.model";

export interface UserStateInterface
{
  isLoading: boolean;
  users: UserDto[];
  error: string | null;
}

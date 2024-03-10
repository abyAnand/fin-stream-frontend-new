import { UserDto } from "src/app/core/models/user/UserDto.model";

export interface SingleUserStateInterface
{
  isLoading: boolean;
  user: UserDto;
  error: string | null;
}

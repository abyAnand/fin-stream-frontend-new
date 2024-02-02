import { AccountSettingService } from './../../core/services/accountSetting/account-setting.service';
import { createSelector, select } from '@ngrx/store';
import { AppStateInterface } from '../types/appState.interface';
import { AccountSettingDto } from 'src/app/core/models/bank/settings/AccountSettingDto.model';

export const selectAccountSetting = (state: AppStateInterface) => state.accountSettings;

export const isLoadingAccountSettingSelector = createSelector(
  selectAccountSetting,
  (state) => state.isLoading
);

export const accountSettingSuccessSelector = createSelector(
  selectAccountSetting,
  (state) => state.accountSettings

);

export const accountSettingErrorSelector = createSelector(
  selectAccountSetting,
  (state) => state.error
);

export const selectSingleAccountSetting = (accountSettinDto: AccountSettingDto) =>
  createSelector(selectAccountSetting, (state) =>
    state.accountSettings.find(
      (accountSetting) => accountSetting.id === accountSettinDto.id
    )
  );

export const isLoadingSingleAccountSetting = createSelector(
  selectAccountSetting,
  (state) => state.isLoading
);

export const singleAccountSettingSuccess = createSelector(
  selectAccountSetting,
  (state) => state.accountSettings
);

export const singleAccountSettingFail = createSelector(
  selectAccountSetting,
  (state) => state.error
);

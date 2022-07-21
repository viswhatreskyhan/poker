import b_ from "b_";
import { FC } from "react";
import Select from "react-select";

import { Networks } from "../../../@types/common";
import { SelectOption } from "../../../@types/selectsModel";
import { editableConfigEvents } from "../../../store/Config";

import { specialSelectStyles } from "../../BaseSelect";

const selectStyles = {
  ...specialSelectStyles,
  option: (provided: object, state: any) => ({
    ...specialSelectStyles.option(provided, state),
    fontSize: "20px",
  }),
  control: (provided: object) => ({
    ...specialSelectStyles.control(provided),
    fontSize: "20px",
    width: "70px",
  }),
  noOptionsMessage: (provided: object) => ({
    display: "none",
  }),
};

interface Props {
  networks: Networks;
  canChangeLevels?: boolean;
}

const b = b_.with("user-settings-table");

// todo импортить колличество уровней
// + 1 чтобы считать с первого уровня
const LEVELS_COUNT = 15 + 1;
const levelsOptions: SelectOption<number>[] = new Array(LEVELS_COUNT)
  .fill(null)
  .map((_, index) => ({
    value: index + 1,
    label: index + 1,
  }));

export const UserSettingsTable: FC<Props> = ({ networks, canChangeLevels }) => {
  return (
    <div className={b({ "select-in-cells": canChangeLevels })}>
      <div className={b("row", { headline: true })}>
        <div className={b("cell")}>Network</div>
        <div className={b("cell")}>Level</div>
      </div>
      {Object.keys(networks).map((network) => {
        const level = networks[network];
        const defaultOption = levelsOptions.find((option) => option.value === level);
        const handleLevelChange = (option: SelectOption<number>) =>
          editableConfigEvents.handleChangeLevel({ network, level: option.value });

        return (
          <div className={b("row")} key={network}>
            <div className={b("cell")}>{network}</div>
            <div className={b("cell")}>
              {canChangeLevels ? (
                <Select
                  options={levelsOptions}
                  defaultValue={defaultOption}
                  // @ts-ignore все работает
                  onChange={handleLevelChange}
                  className={b("input", { select: true })}
                  styles={selectStyles}
                />
              ) : (
                networks[network]
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

import { FC, useState } from "react";
import {
  $level,
  $moneyEnd,
  $moneyStart,
  handleChangeDateEnd,
  handleChangeDateStart,
  handleChangeMoneyEnd,
  handleChangeMoneyStart,
  handleChangeNetwork,
  handleChangeOnlyFreezout,
  handleChangeOnlyKO,
  handleChangeOnlyNormal,
  handleChangeOnlySuperTurbo,
  handleChangeOnlyTurbo,
  handleChangeTime,
  handleChangeTimezone,
} from "../../store/Select";
import {
  $network,
  $onlyKO,
  $onlyTurbo,
  $onlySuperTurbo,
  $stateNetwork,
  $stateTime,
  $dateStart,
  $dateEnd,
  $onlyFreezout,
  $onlyNormal,
  $stateTimezone,
} from "../../store/Select/state";
import { useStore } from "effector-react";
import { BaseSelect } from "../BaseSelect/BaseSelect";
import { BaseSelectMulti } from "../BaseSelectMulti/BaseSelectMulti";
import { UpdateButton } from "../UpdateButton/UpdateButton";
import { BaseInput } from "../BaseInput/BaseInput";
import { BaseCheckbox } from "../BaseCheckbox";
import classes from "./BaseHeader.module.scss";
import { BaseInputMask } from "../BaseInputMask";
import { ComponentCategory } from "../ComponentCategory";

export const BaseHeader: FC = () => {
  const moneyStart = useStore($moneyStart),
    moneyEnd = useStore($moneyEnd),
    levelInfo = useStore($level),
    onlyKO = useStore($onlyKO),
    onlyTurbo = useStore($onlyTurbo),
    onlySuperTurbo = useStore($onlySuperTurbo),
    maxMoneyEnd = levelInfo?.moneyEnd ?? 1,
    dateStart = useStore($dateStart),
    dateEnd = useStore($dateEnd),
    onlyFreezout = useStore($onlyFreezout),
    onlyNormal = useStore($onlyNormal),
    networkLength = useStore($network)?.length ?? 0;

  return (
    <header className={classes.wrapper}>
      <div className={classes.wrap}>
        <div className={classes.wr}>
          <ComponentCategory category="Network">
            <BaseSelectMulti
              children={networkLength + " networks"}
              className={classes.network}
              options={$stateNetwork}
              onChange={handleChangeNetwork}
              placeholder="Network"
            />
          </ComponentCategory>
          <ComponentCategory category="Starts">
            <BaseSelect
              className={classes.time}
              options={$stateTime}
              onChange={handleChangeTime}
              placeholder="Time"
            />
          </ComponentCategory>
          <ComponentCategory category="Time range">
            <div className={classes.inputWrapper}>
              <BaseInputMask
                placeholder="From(h)"
                value={dateStart}
                handleChange={handleChangeDateStart}
                className={classes.input}
              />
              <BaseInputMask
                placeholder="To(h)"
                value={dateEnd}
                handleChange={handleChangeDateEnd}
                className={classes.input}
              />
            </div>
          </ComponentCategory>
          <ComponentCategory category="Time zone">
            <BaseSelect
              className={classes.timezone}
              options={$stateTimezone}
              onChange={handleChangeTimezone}
              placeholder="Timezone"
            />
          </ComponentCategory>
        </div>
        <div className={classes.wr} style={{ marginBottom: "5px" }}>
          <ComponentCategory category="Buy-in">
            <div className={classes.inputWrapper}>
              <BaseInput
                value={moneyStart}
                handleChange={handleChangeMoneyStart}
                max={moneyEnd}
                placeholder="From"
                className={classes.input}
              />
              <BaseInput
                value={moneyEnd}
                handleChange={handleChangeMoneyEnd}
                max={maxMoneyEnd}
                placeholder="To"
                className={classes.input}
              />
            </div>
          </ComponentCategory>
        </div>
        <div className={classes.wr}>
          <ComponentCategory category="Format">
            <div className={classes.checkboxWrapper}>
              <BaseCheckbox
                label="KO"
                checked={onlyKO}
                onChange={() => handleChangeOnlyKO(!onlyKO)}
                className={classes.checkbox}
              />
              <BaseCheckbox
                label="Freezout"
                checked={onlyFreezout}
                onChange={() => handleChangeOnlyFreezout(!onlyFreezout)}
                className={classes.checkbox}
              />
              <BaseCheckbox
                label="Normal"
                checked={onlyNormal}
                onChange={() => handleChangeOnlyNormal(!onlyNormal)}
                className={classes.checkbox}
              />
              <BaseCheckbox
                label="Turbo"
                checked={onlyTurbo}
                onChange={() => handleChangeOnlyTurbo(!onlyTurbo)}
                className={classes.checkbox}
              />
              <BaseCheckbox
                label="Super Turbo"
                checked={onlySuperTurbo}
                onChange={() => handleChangeOnlySuperTurbo(!onlySuperTurbo)}
                className={classes.checkbox}
              />
            </div>
          </ComponentCategory>
        </div>
        <div className={classes.wr} style={{ justifyContent: "center" }}>
          <UpdateButton />
        </div>
      </div>
    </header>
  );
};

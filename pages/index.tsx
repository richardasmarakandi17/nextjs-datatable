import type { NextPage } from "next";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import tempdata from "./tempdata";

export enum Forms {
  InsertDataForm,
  RemoveDataForm,
}

const Home: NextPage = () => {
  const [data, setData] = useState(tempdata);

  const [insertDataTimer, setInsertDataTimer] = useState(3);
  const [removeDataTimer, setRemoveDataTimer] = useState(10);

  const [insertDataCountdown, setInsertDataCountdown] =
    useState(insertDataTimer);
  const [isInsertDataCountdownTicking, setInsertDataCountdownTicking] =
    useState(true);

  const [removeDataCountdown, setRemoveDataCountdown] =
    useState(removeDataTimer);
  const [isRemoveDataCountdownTicking, setRemoveDataCountdownTicking] =
    useState(true);

  const [form_insertDataTimer, setForm_InsertDataTimer] =
    useState(insertDataTimer);
  const [form_removeDataTimer, setForm_RemoveDataTimer] =
    useState(removeDataTimer);

  const handleSubmit = (e: FormEvent<HTMLFormElement>, form: Forms) => {
    e.preventDefault();
    if (form == Forms.InsertDataForm) setInsertDataTimer(form_insertDataTimer);
    else if (form == Forms.RemoveDataForm)
      setRemoveDataTimer(form_removeDataTimer);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, setter: any) => {
    var temp_value;
    if (setter == setInsertDataTimer || setter == setRemoveDataTimer)
      temp_value = parseInt(e.target.value) || 0;
    setter(temp_value);
  };

  var timeout;

  useEffect(() => {
    if (insertDataCountdown > 0) {
      timeout = setTimeout(
        () => setInsertDataCountdown(insertDataCountdown - 1),
        1000
      );
      setInsertDataCountdownTicking(true);
    } else {
      setData([...data, { nama: "Ichu" }]);
      setInsertDataCountdown(insertDataTimer);
      setInsertDataCountdownTicking(false);
    }
  }, [insertDataCountdown]);

  useEffect(() => {
    if (removeDataCountdown > 0) {
      timeout = setTimeout(
        () => setRemoveDataCountdown(removeDataCountdown - 1),
        1000
      );
      setRemoveDataCountdownTicking(true);
    } else {
      var tempData = [...data];
      tempData.pop();
      setData([...tempData]);
      setRemoveDataCountdown(removeDataTimer);
      setRemoveDataCountdownTicking(false);
    }
  }, [removeDataCountdown]);

  useEffect(() => {
    if (!isInsertDataCountdownTicking) setInsertDataCountdown(insertDataTimer);
  }, [insertDataTimer]);

  useEffect(() => {
    if (!isRemoveDataCountdownTicking) setRemoveDataCountdown(removeDataTimer);
  }, [removeDataTimer]);

  return (
    <div>
      <div>Insert Data Countdown : {insertDataCountdown}</div>
      <form onSubmit={(e) => handleSubmit(e, Forms.InsertDataForm)}>
        <input
          value={form_insertDataTimer}
          onChange={(e) => handleInputChange(e, setForm_InsertDataTimer)}
        ></input>
      </form>
      <br />
      <div>Remove Data Countdown : {removeDataCountdown}</div>
      <form onSubmit={(e) => handleSubmit(e, Forms.RemoveDataForm)}>
        <input
          value={form_removeDataTimer}
          onChange={(e) => handleInputChange(e, setForm_RemoveDataTimer)}
        ></input>
      </form>

      {data.map((object) => {
        return (
          <>
            <ul>
              <li>{object.nama}</li>
            </ul>
            <br />
          </>
        );
      })}
    </div>
  );
};

export default Home;

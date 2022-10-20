import type { NextPage } from "next";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import tempdata from "../components/tempdata";

export const NIKGenerator = () => {
  var string = "";
  for (let index = 0; index < 16; index++) {
    string = string + Math.floor(Math.random() * 10).toString();
  }
  return string;
};

export const NameGenerator = () => {
  var names = [
    "John Doe",
    "David Gadgetin",
    "Windah Basudara",
    "Yuki Kato",
    "Uzumaki Naruto",
    "Namikaze Minato",
    "Yusril Zubaydi",
    "Manda Impact",
    "Kael Jack",
    "Rere Arga",
    "Sulistyowati",
    "Brian Furran",
    "Syafiq Wafi",
  ];
  return names[Math.floor(Math.random() * 13)];
};

export const AgeGenerator = () => {
  return Math.floor(Math.random() * 61);
};

export enum Forms {
  InsertDataForm,
  RemoveDataForm,
  AddDataForm,
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
  const [form_dataName, setForm_DataName] = useState("");
  const [form_dataNIK, setForm_DataNIK] = useState("");
  const [form_dataUmur, setForm_DataUmur] = useState(17);

  const handleSubmit = (e: FormEvent<HTMLFormElement>, form: Forms) => {
    e.preventDefault();
    if (form == Forms.InsertDataForm) setInsertDataTimer(form_insertDataTimer);
    else if (form == Forms.RemoveDataForm)
      setRemoveDataTimer(form_removeDataTimer);
    else if (form == Forms.AddDataForm) {
      var temp_data = [
        ...data,
        { nama: form_dataName, nik: form_dataNIK, umur: form_dataUmur },
      ];
      console.log(temp_data);
      setData(temp_data);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, setter: any) => {
    var temp_value;
    if (setter == setInsertDataTimer || setter == setRemoveDataTimer)
      temp_value = parseInt(e.target.value) || 0;
    else temp_value = e.target.value;
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
      setData([
        ...data,
        { nama: NameGenerator(), nik: NIKGenerator(), umur: AgeGenerator() },
      ]);
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
    <>
      <h1 className="text-center text-6xl p-10">DataTable Example</h1>

      <div className="flex justify-around mt-5 gap-x-3">
        <div className="rounded-md bg-slate-900 p-4 self-baseline">
          <h2 className=" text-center text-2xl">Control Panel</h2>
          <div className="mt-3">
            <form onSubmit={(e) => handleSubmit(e, Forms.InsertDataForm)}>
              <div className="flex flex-col gap-y-2">
                <label className="text-center">Change Auto Insert Timer</label>
                <input
                  className="w-10 self-center text-center"
                  value={form_insertDataTimer}
                  onChange={(e) =>
                    handleInputChange(e, setForm_InsertDataTimer)
                  }
                ></input>
                <button
                  className="bg-slate-400 p-1 w-10 self-center"
                  type="submit"
                >
                  Set
                </button>
              </div>
            </form>
            <form
              className="mt-5"
              onSubmit={(e) => handleSubmit(e, Forms.RemoveDataForm)}
            >
              <div className="flex flex-col gap-y-2">
                <label className="text-center">Change Auto Delete Timer</label>
                <input
                  className="w-10 text-center self-center"
                  value={form_removeDataTimer}
                  onChange={(e) =>
                    handleInputChange(e, setForm_RemoveDataTimer)
                  }
                ></input>
                <button
                  className="bg-slate-400 p-1 w-10 self-center"
                  type="submit"
                >
                  Set
                </button>
              </div>
            </form>
            <div className="p-5 text-center">
              <div>New data will be inserted in {insertDataCountdown}</div>
              <div>Latest data will be removed in {removeDataCountdown}</div>
            </div>
          </div>
        </div>

        <div>
          <div className="rounded-md p-4 bg-slate-900">
            <div className="text-center text-2xl">Insert Data</div>
            <br />
            <form
              className="ml-5"
              onSubmit={(e) => handleSubmit(e, Forms.AddDataForm)}
            >
              <div className="flex justify-between gap-x-4">
                <label className="w-11"> Nama </label>
                <input
                  value={form_dataName}
                  onChange={(e) => handleInputChange(e, setForm_DataName)}
                ></input>
              </div>
              <br />
              <div className="flex justify-between gap-x-4">
                <label className="w-11"> NIK </label>
                <input
                  value={form_dataNIK}
                  onChange={(e) => handleInputChange(e, setForm_DataNIK)}
                ></input>
              </div>
              <br />
              <div className="flex justify-between gap-x-4">
                <label className="w-11"> Umur</label>
                <input
                  className="flex-grow text-center w-10"
                  value={form_dataUmur}
                  onChange={(e) => handleInputChange(e, setForm_DataUmur)}
                ></input>
              </div>
              <div className="flex justify-center p-5">
                <button className="bg-slate-400 p-1" type="submit">
                  Add Data
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="rounded-md p-4">
          <div className="flex justify-center">
            <table className="items-center">
              <tbody>
                <tr>
                  <th className="p-3 border border-separate">Nama</th>
                  <th className="p-3 border border-separate">NIK</th>
                  <th className="p-3 border border-separate">Umur</th>
                </tr>
              </tbody>
              {data.map((object) => {
                return (
                  <tbody key={object.nik}>
                    <tr>
                      <td className="p-3 border">{object.nama}</td>
                      <td className="p-3 border">{object.nik}</td>
                      <td className="p-3 border text-center">{object.umur}</td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

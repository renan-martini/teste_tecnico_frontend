import { StyledHome } from "./styles";
import { NumericFormat } from "react-number-format";
import { Button, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { API } from "../../services/api";
import { toast } from "react-toastify";

interface IForm {
  amount: number;
  installments: number;
  mdr: number;
}

function Home() {
  const [values, setValues] = useState({ "1": 0, "15": 0, "30": 0, "90": 0 });
  const schema = yup.object().shape({
    amount: yup.number().required(),
    installments: yup.number().required(),
    mdr: yup.number().required(),
  });

  const { handleSubmit, control } = useForm<IForm>({
    resolver: yupResolver(schema),
    reValidateMode: "onSubmit",
  });

  const makeRequisition = (data: IForm) => {
    const id = toast.loading("Calculando...");
    API.post("?delay=2000", data)
      .then((res) => {
        toast.update(id, {
          render: "Calculado com sucesso!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
          draggable: true,
        });
        setValues(res.data);
      })
      .catch((_) => {
        toast.update(id, {
          render: "Erro ao requisitar!",
          type: "error",
          isLoading: false,
          autoClose: 2000,
          draggable: true,
        });
      });
  };

  return (
    <StyledHome>
      <div>
        <div>
          <h2>Simule sua Antecipação</h2>
          <form action="" onSubmit={handleSubmit(makeRequisition)}>
            <Controller
              name="amount"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error, invalid },
              }: any) => (
                <NumericFormat
                  customInput={TextField}
                  label="Valor da venda"
                  required
                  decimalScale={2}
                  decimalSeparator=","
                  thousandSeparator="."
                  valueIsNumericString
                  prefix="R$"
                  placeholder="0,00"
                  fixedDecimalScale={true}
                  error={invalid}
                  helperText={error?.message}
                  onValueChange={(values) => {
                    onChange({
                      target: {
                        name: "numberformat",
                        value: values.value,
                      },
                    } as React.ChangeEvent<HTMLInputElement>);
                  }}
                />
              )}
            />
            <Controller
              name="installments"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error, invalid },
              }: any) => (
                <TextField
                  type={"number"}
                  variant="outlined"
                  label="Quantidade de parcelas"
                  required
                  placeholder="0"
                  onChange={onChange}
                  error={invalid}
                  helperText={error?.message}
                />
              )}
            />

            <Controller
              name="mdr"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error, invalid },
              }: any) => (
                <NumericFormat
                  customInput={TextField}
                  label="Percentual de MDR"
                  required
                  decimalScale={2}
                  decimalSeparator=","
                  thousandSeparator="."
                  valueIsNumericString
                  suffix="%"
                  placeholder="0,00"
                  fixedDecimalScale={true}
                  onValueChange={(values) => {
                    onChange({
                      target: {
                        name: "numberformat",
                        value: values.value,
                      },
                    } as React.ChangeEvent<HTMLInputElement>);
                  }}
                  error={invalid}
                  helperText={error?.message}
                />
              )}
            />

            <Button variant="outlined" type="submit">
              Calcular
            </Button>
          </form>
        </div>
        <section>
          <h3>VOCÊ RECEBERÁ:</h3>
          <p>
            Amanhã: <strong>R$ {values["1"].toFixed(2)}</strong>
          </p>
          <p>
            Em 15 dias: <strong>R$ {values["15"].toFixed(2)}</strong>
          </p>
          <p>
            Em 30 dias: <strong>R$ {values["30"].toFixed(2)}</strong>
          </p>
          <p>
            Em 90 dias: <strong>R$ {values["90"].toFixed(2)}</strong>
          </p>
        </section>
      </div>
    </StyledHome>
  );
}

export default Home;

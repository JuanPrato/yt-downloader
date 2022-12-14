import { type FormEvent, useState } from "react";

export function useForm<T extends {}>(defaultValue: T) {

    const [values, setValues] = useState<T>(defaultValue);

    function register(key: keyof T) {
        return {
            value: values[key],
            onChange: (e: FormEvent<HTMLInputElement>) => setValues({ ...values, [key]: e.currentTarget!.value })
        }
    }

    function handleSubmit(e : FormEvent<HTMLFormElement>, cb: (values: T) => void | Promise<void>) {
        e.preventDefault();
        cb(values);
    }

    return {
        register,
        handleSubmit
    }

}
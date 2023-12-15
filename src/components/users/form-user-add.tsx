import { useForm } from "react-hook-form";

import { useUserStore } from "@/store/use-user-store";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  VStack,
} from "@chakra-ui/react";

interface UserFormData {
  name: string;
  email: string;
}

export const FormUserAdd = () => {
  const { addUser } = useUserStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserFormData>();

  const onSubmit = (data: UserFormData) => {
    console.log(`ADDING USER`);
    addUser(data);
    reset();
    // Handle form submission
  };
  console.log(`RENDERING FORM USER ADD`);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4} p={2}>
        <FormControl isInvalid={!!errors.name}>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            id="name"
            placeholder="Name"
            {...register("name", { required: "This field is required" })}
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.email}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            placeholder="Email"
            type="email"
            {...register("email", {
              required: "This field is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
              // validate: {
              //   exists: (val) => !users.map((u) => u.email).includes(val),
              // },
            })}
          />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>

        <Button mt={4} isLoading={isSubmitting} type="submit">
          Añadir
        </Button>
      </Stack>
    </form>
  );
};

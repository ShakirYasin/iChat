import { AddIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { Box, Button, color, Flex, Input, InputGroup, InputRightElement, Text, useBoolean, VisuallyHiddenInput, VStack } from "@chakra-ui/react"
import { useRef, useState } from "react"
import { useForm } from 'react-hook-form'
import {zodResolver} from "@hookform/resolvers/zod"
import * as z from "zod"

const signupSchema = z.object({
    name: z.string().min(2, {message: "Required"}),
    email: z.string().email().min(2, {message: "Required"}),
    password: z.string().min(2, {message: "Required"}),
    confirmPassword: z.string().min(2, {message: "Required"}),
    image: z.string().min(2, {message: "Required"}),
}).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ['confirmPassword']
      });
    }
  });

const loginSchema = z.object({
    email: z.string().email().min(2, {message: "Required"}),
    password: z.string().min(2, {message: "Required"}),
})

export const LoginForm = () => {

    const {
        register, 
        handleSubmit, 
        formState: {
            errors,
            isSubmitting
        }
    } = useForm({
        values: {
            email: "",
            password: "",
        },
        resolver: zodResolver(loginSchema)
    })

    const submit = (values) => {
        console.log({values});
    }

    const [showPass, showPassSet] = useState(false)
    return (
        <form onSubmit={handleSubmit(submit)}>
            <VStack spacing={3}>
                <Input width={"100%"} placeholder='Email' type={"email"} isInvalid={errors.email} {...register('email')} />
                <InputGroup>
                    <Input type={showPass ? "text" : "password"} placeholder='Password' isInvalid={errors.password} {...register('password')} />
                    <InputRightElement width='3.5rem'>
                    <Button h='1.75rem' size='sm' onClick={() => showPassSet(prev => !prev)}>
                        {showPass ? 
                        <ViewOffIcon />
                        : 
                        <ViewIcon />
                        }
                    </Button>
                    </InputRightElement>
                </InputGroup>
                <Button type={"submit"} width={"full"}>Login</Button>
                <Button width={"full"} bg={"teal"} _hover={{bg: "teal", opacity: 0.8}}>Guest User</Button>
            </VStack>
        </form>
    )
}

export const SignUpForm = () => {
    const [showPass, setShowPass] = useBoolean()
    const imageRef = useRef(null)

    const {
        register, 
        handleSubmit, 
        formState: {
            errors,
            isSubmitting
        }
    } = useForm({
        values: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            image: "",
        },
        resolver: zodResolver(signupSchema)
    })

    const submit = (values) => {
        console.log({values});
    }

    return (
        <form onSubmit={handleSubmit(submit)}>
            <VStack spacing={3} mt={4}>
                <Input width={"full"} placeholder='Name' type={"text"} isInvalid={errors.name} {...register('name')} />
                <Input width={"full"} placeholder='Email' type={"email"} isInvalid={errors.email} {...register('email')} />
                <InputGroup>
                    <Input type={showPass ? "text" : "password"} placeholder='Password' isInvalid={errors.password} {...register('password')} />
                    <InputRightElement width='3.5rem'>
                    <Button h='1.75rem' size='sm' onClick={setShowPass.toggle}>
                        {showPass ? 
                        <ViewOffIcon />
                        : 
                        <ViewIcon />
                        }
                    </Button>
                    </InputRightElement>
                </InputGroup>
                <InputGroup>
                    <Input type={showPass ? "text" : "password"} placeholder='Confirm Password' isInvalid={errors.confirmPassword} {...register('confirmPassword')} />
                    <InputRightElement width='3.5rem'>
                    <Button h='1.75rem' size='sm' onClick={setShowPass.toggle}>
                        {showPass ? 
                        <ViewOffIcon />
                        : 
                        <ViewIcon />
                        }
                    </Button>
                    </InputRightElement>
                </InputGroup>
                <Flex align={"center"} gap={"10px"} border={"1px solid rgba(255,255,255,0.16)"} borderRadius={"5px"} width={"full"} p={"5px 8px"} cursor={"pointer"} onClick={() => imageRef.current.click()}>
                    <AddIcon color={"whiteAlpha.400"}/>
                    <Text color={"whiteAlpha.400"} textAlign={"start"} >Upload Profile Image</Text>
                    <VisuallyHiddenInput type={"file"} ref={imageRef} accept={"image/*"} onChange={(e) => postDetails(e.target.files[0])} />
                </Flex>
                <Button type="submit" width={"full"} bg={"teal"}>SignUp</Button>
            </VStack>
        </form>
    )
}
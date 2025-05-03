'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import {DefaultValues, FieldValues, Path, SubmitHandler, useForm, UseFormReturn} from 'react-hook-form'

import React from 'react'
import { z } from 'zod'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from 'next/link'
import { FIELD_NAMES, FIELD_TYPES } from '@/constants'
import ImageUpload from './ImageUpload'

interface Props<T extends FieldValues> {
  schema: z.ZodType<T>;
  defaultValues: DefaultValues<T>;
  onSubmit: (data: T) => Promise<{success: boolean, error?: string}>;
  type: 'SIGN_IN' | 'SIGN_UP'
} 

const AuthForm = <T extends FieldValues> ({
    type,
    schema,
    defaultValues,
    onSubmit
}: Props<T>) => {

  const isSignIn = type === 'SIGN_IN'

   // 1. Define your form.
   const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>
  })
 

  const handleSubmit: SubmitHandler<T> = async(data) => {

  }
  return (

    <div className='flex flex-col gap-col'>
      <h1 className='text-2xl font-semibold text-white '>
        {isSignIn ? 'Welcome back to BookWise' : 'Create your library account'}
      </h1>
      <p className='text-light-100 mt-6 mb-4'>
        {isSignIn ? 'Access the best books and resources' : 'Join the community of book lovers'}
      </p>
      <Form {...form}>
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 w-full">

      {Object.keys(defaultValues).map((field) => (
        <FormField
        key={field}
        control={form.control}
        name={field as Path<T>}
        render={({ field }) => (
          <FormItem>
            <FormLabel className='capitalize'>{FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}</FormLabel>
            <FormControl>
              {field.name === 'universityCard' ? (
                <ImageUpload 
                  onFileChange = {field.onChange}
                />) : (
                  <Input required type= {
                   FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]} {...field}
                   className='form-input'
                  />
                )
              }
              
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      ))
      }
      
      <Button type="submit" className='form-btn'>
        {isSignIn ? 'Sign in' : 'Create account'}
      </Button>
    </form>
  </Form>
  <p className='text-center text-base font-medium mt-5'>
        {isSignIn ? 'Don\'t have an account? ' : 'Already have an account? '}
        <Link href={isSignIn ? '/sign-up' : '/sign-in'} className='text-light-100 hover:text-light-200'>
          {isSignIn ? 'Create an account' : 'Sign in'}
        </Link>
  </p>
    </div>
    
  )
}

export default AuthForm

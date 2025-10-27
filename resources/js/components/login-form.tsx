import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldGroup } from "@/components/ui/field"
import { useForm } from "@inertiajs/react"
import { FormEventHandler } from "react"

interface LoginFormProps extends React.ComponentPropsWithoutRef<"form"> {
  canResetPassword: boolean
}

export function LoginForm({
  className,
  canResetPassword,
  ...props
}: LoginFormProps) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
  })

  const submit: FormEventHandler = (e) => {
    e.preventDefault()
    post(route('login'), {
      onFinish: () => reset('password'),
    })
  }

  return (
    <form className={cn("flex flex-col gap-6", className)} onSubmit={submit} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Enter your email and password to log in to your account
          </p>
        </div>

        <Field>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
            autoComplete="username"
          />
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email}</p>
          )}
        </Field>

        <Field>
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            {canResetPassword && (
              <a
                href={route('password.request')}
                className="text-sm underline-offset-4 hover:underline text-muted-foreground"
              >
                Forgot password?
              </a>
            )}
          </div>
          <Input
            id="password"
            type="password"
            required
            value={data.password}
            onChange={(e) => setData('password', e.target.value)}
            autoComplete="current-password"
          />
          {errors.password && (
            <p className="text-sm text-red-600">{errors.password}</p>
          )}
        </Field>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="remember"
            checked={data.remember}
            onCheckedChange={(checked) => setData('remember', checked as boolean)}
          />
          <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
            Remember me
          </Label>
        </div>

        <Button type="submit" className="w-full" disabled={processing}>
          Log in
        </Button>

        <div className="text-center text-sm">
          Don't have an account?{" "}
          <a href="/register" className="underline underline-offset-4 hover:text-primary">
            Sign up
          </a>
        </div>
      </FieldGroup>
    </form>
  )
}

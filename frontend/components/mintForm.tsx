"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";

const roles = [
  { label: "None", value: "none" },
  { label: "External Affairs", value: "ea" },
  { label: "Internal Affairs", value: "ia" },
  { label: "Presidential Cell", value: "pc" },
  { label: "Blockchain", value: "bc" },
  { label: "Machine Learning", value: "ml" },
  { label: "Software Development", value: "sd" },
  { label: "Quant", value: "q" },
  { label: "Alumni", value: "a" },
] as const;

const FormSchema = z.object({
  role: z.string({
    required_error: "Please select a role.",
  }),
  passCode: z.string().optional(),
});

export function MintForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-5">
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full">
              <FormLabel>Role</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? roles.find((role) => role.value === field.value)
                            ?.label
                        : "Select Role"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search framework..."
                      className="h-9"
                    />
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                      {roles.map((role) => (
                        <CommandItem
                          value={role.label}
                          key={role.value}
                          onSelect={() => {
                            form.setValue("role", role.value);
                          }}
                        >
                          {role.label}
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              role.value === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Passcode</FormLabel>
              <FormControl>
                <Input placeholder="Enter Passcode" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="text-black bg-primary w-full py-5
        hover:bg-opacity-65 bg-opacity-50 transition duration-75 ease-linear"
          type="submit"
        >
          Mint
        </Button>
      </form>
    </Form>
  );
}

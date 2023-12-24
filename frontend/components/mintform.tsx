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
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { generateSignature } from "@/lib/signature";

const roles = [
  { label: "None", value: 0 },
  { label: "External Affairs", value: 1 },
  { label: "Internal Affairs", value: 2 },
  { label: "Presidential Cell", value: 3 },
  { label: "Blockchain", value: 4 },
  { label: "Machine Learning", value: 5 },
  { label: "Software Development", value: 6 },
  { label: "Quant", value: 7 },
  { label: "Alumni", value: 8 },
] as const;

const FormSchema = z.object({
  role: z.number({
    required_error: "Please select a role.",
  }),
  passCode: z.string().optional(),
});

export function MintForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast.loading("Sent transaction to chain");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 pt-5 text-center md:text-left"
      >
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel>Role</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "m-auto w-[200px] justify-between md:m-0",
                        !field.value && "text-muted-foreground",
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
                                : "opacity-0",
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
          className="w-full bg-primary bg-opacity-50 py-5
        text-black transition duration-75 ease-linear hover:bg-opacity-65"
          type="submit"
        >
          Mint
        </Button>
      </form>
    </Form>
  );
}

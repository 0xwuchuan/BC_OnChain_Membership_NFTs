import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { useContractWrite, useAccount, useWaitForTransaction } from "wagmi";
import { generateSignature } from "@/lib/generateSignature";
import { validatePassCode } from "@/lib/validatePasscode";
import { Hex } from "viem";

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

  // @dev address should be defined since
  // this component is only rendered when the user is connected
  const { address } = useAccount();

  const testNetAddress = "0xA9478d6b2192D10d2B12b49829ADE361F539551F";

  const { data, error, write } = useContractWrite({
    chainId: 84531,
    address: testNetAddress,
    abi: [
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_role",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "_signature",
            type: "bytes",
          },
        ],
        name: "mint",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      ,
    ],
    functionName: "mint",
    onError(error) {
      toast.error(error?.message);
    },
    onSuccess() {
      toast.loading("Transaction sent");
    },
  });

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess(data) {
      toast.success("Fintechie minted", {
        duration: 10000,
        action: {
          label: "View on Basescan",
          onClick: () =>
            window.open(
              `https://goerli.basescan.org/tx/${data?.transactionHash}`,
            ),
        },
      });
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const { role, passCode } = data;
      if (role !== 0) {
        const isValid = await validatePassCode(role, passCode as string);
        if (!isValid) {
          throw new Error("Invalid passcode");
        }
      }

      const signature = (await generateSignature(
        role,
        address as `0x${string}`,
      )) as Hex;

      write?.({ args: [role, signature] });
    } catch (err) {
      if (err) {
        toast.error("Invalid passcode");
        return;
      }
      toast.error(error?.message);
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-center text-lg md:text-left md:text-xl">
          Mint a Fintechie
        </DialogTitle>
        <DialogDescription className="text-center text-sm md:text-left md:text-base">
          To mint your Fintechie, kindly select your role and enter the
          corresponding passcode. If you are not a member of the society, choose
          'None'.
        </DialogDescription>
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
      </DialogHeader>
    </DialogContent>
  );
}

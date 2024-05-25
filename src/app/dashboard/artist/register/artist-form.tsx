"use client"

import {z} from "zod"
import {useFieldArray, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {useToast} from "@/components/ui/use-toast";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {CalendarIcon, CaretSortIcon, CheckIcon} from "@radix-ui/react-icons";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import {format} from "date-fns";
import {Calendar} from "@/components/ui/calendar";

const persons = [
  {personName: "이지은", personId: 1},
  {personName: "권정열", personId: 2},
  {personName: "안지영", personId: 3},
  {personName: "장다혜", personId: 4},
  {personName: "이무진", personId: 5},
] as const

const countries = [
  {countryName: "대한민국", countryId: 1},
  {countryName: "미국", countryId: 2},
  {countryName: "일본", countryId: 3},
  {countryName: "중국", countryId: 4},
] as const

const artistFormSchema = z.object({
  name: z.string(),
  members: z.array(
    z.object({
      stageName: z.string(),
      personId: z.number(),
      startDate: z.date(),
      endDate: z.date(),
    })
  ),
  artistNationalities: z.array(
    z.object({
      countryId: z.number(),
      startDate: z.date(),
      endDate: z.date(),
    })
  )
})

type ArtistFormValues = z.infer<typeof artistFormSchema>

export function ArtistRegisterForm() {
  const {toast} = useToast()

  const form = useForm<ArtistFormValues>({
    resolver: zodResolver(artistFormSchema),
    mode: "onChange"
  })

  const memberFieldArray = useFieldArray({
    name: "members",
    control: form.control,
  })

  const artistNationalityFieldArray = useFieldArray({
    name: "artistNationalities",
    control: form.control,
  })

  function onSubmit(data: ArtistFormValues) {
    toast({
      title: "submit data",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      )
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* 아티스트 이름 영역 */}
        <div>
          <FormField
            control={form.control}
            name="name"
            render={({field}) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="artist name" {...field} />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
        </div>

        {/* 멤버 등록 영역 */}
        <div className="mt-4">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="my-4"
            onClick={() => memberFieldArray.append({
              stageName: "",
              personId: 0,
              startDate: new Date(),
              endDate: new Date()
            })}
          >
            Add Member
          </Button>
          <div className="flex items-center gap-4">
            <div className="w-[200px] min-w-[200px]">
              <FormLabel>StageName</FormLabel>
            </div>
            <div className="w-[200px] min-w-[200px]">
              <FormLabel>Person</FormLabel>
            </div>
            <div className="w-[200px] min-w-[200px]">
              <FormLabel>Start Date</FormLabel>
            </div>
            <div className="w-[200px] min-w-[200px]">
              <FormLabel>End Date</FormLabel>
            </div>
          </div>
          {
            memberFieldArray.fields.map((field, index) => (
              <div className="flex items-center gap-4" key={field.id}>
                <FormField
                  control={form.control}
                  name={`members.${index}.stageName`}
                  render={({field}) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="stage name" className="w-[200px]" {...field}/>
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`members.${index}.personId`}
                  render={({field}) => (
                    <FormItem>
                      <div>
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
                                  ? persons.find(
                                    (person) => person.personId === field.value
                                  )?.personName : "Select person"
                                }
                                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0">
                            <Command>
                              <CommandInput placeholder="Search person..."/>
                              <CommandList>
                                <CommandEmpty>No person found.</CommandEmpty>
                                <CommandGroup>
                                  {persons.map((person) => (
                                    <CommandItem
                                      key={person.personId}
                                      value={person.personName}
                                      onSelect={() => {
                                        form.setValue(`members.${index}.personId`, person.personId)
                                      }}
                                    >
                                      <CheckIcon
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          person.personId === field.value
                                            ? "opacity-100" : "opacity-0"
                                        )}
                                      />
                                      {person.personName}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </div>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`members.${index}.startDate`}
                  render={({field}) => (
                    <FormItem>
                      <div>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[200px] pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`members.${index}.endDate`}
                  render={({field}) => (
                    <FormItem>
                      <div>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[200px] pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => memberFieldArray.remove(index)}
                >
                  Remove
                </Button>
              </div>
            ))
          }
        </div>

        {/* 아티스트 국적 등록 영역 */}
        <div className="mt-4">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="my-4"
            onClick={() => artistNationalityFieldArray.append({
              countryId: 0,
              startDate: new Date(),
              endDate: new Date()
            })}
          >
            Add Country
          </Button>
          <div className="flex items-center gap-4">
            <div className="w-[200px] min-w-[200px]">
              <FormLabel>Country</FormLabel>
            </div>
            <div className="w-[200px] min-w-[200px]">
              <FormLabel>Person</FormLabel>
            </div>
            <div className="w-[200px] min-w-[200px]">
              <FormLabel>Start Date</FormLabel>
            </div>
          </div>
          {
            artistNationalityFieldArray.fields.map((field, index) => (
              <div className="flex items-center gap-4" key={field.id}>
                <FormField
                  control={form.control}
                  name={`artistNationalities.${index}.countryId`}
                  render={({field}) => (
                    <FormItem>
                      <div>
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
                                  ? countries.find(
                                    (country) => country.countryId === field.value
                                  )?.countryName : "Select country"
                                }
                                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0">
                            <Command>
                              <CommandInput placeholder="Search person..."/>
                              <CommandList>
                                <CommandEmpty>No country found.</CommandEmpty>
                                <CommandGroup>
                                  {countries.map((country) => (
                                    <CommandItem
                                      key={country.countryId}
                                      value={country.countryName}
                                      onSelect={() => {
                                        form.setValue(`artistNationalities.${index}.countryId`, country.countryId)
                                      }}
                                    >
                                      <CheckIcon
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          country.countryId === field.value
                                            ? "opacity-100" : "opacity-0"
                                        )}
                                      />
                                      {country.countryName}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </div>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`artistNationalities.${index}.startDate`}
                  render={({field}) => (
                    <FormItem>
                      <div>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[200px] pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`artistNationalities.${index}.endDate`}
                  render={({field}) => (
                    <FormItem>
                      <div>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[200px] pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => artistNationalityFieldArray.remove(index)}
                >
                  Remove
                </Button>
              </div>
            ))
          }
        </div>
        <div className="mt-4">
          <Button type="submit">Register</Button>
        </div>
      </form>
    </Form>
  )
}
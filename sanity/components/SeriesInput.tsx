import { Button, Flex, Stack, TextInput } from '@sanity/ui'
import { set, unset, useFormValue, type StringInputProps } from 'sanity'

/**
 * A plain text box for the series name, with the series names already used in
 * this tab offered as one-click buttons so the same name is spelled the same.
 */
export default function SeriesInput({ value, onChange, elementProps }: StringInputProps) {
  const pieces = useFormValue(['pieces']) as { series?: string }[] | undefined
  const existing = [...new Set((pieces ?? []).map((piece) => piece.series?.trim()).filter(Boolean))] as string[]

  const update = (next: string) => onChange(next ? set(next) : unset())

  return (
    <Stack gap={2}>
      <TextInput
        {...elementProps}
        value={value ?? ''}
        onChange={(event) => update(event.currentTarget.value)}
      />
      {existing.length > 0 ? (
        <Flex gap={2} wrap="wrap">
          {existing.map((name) => (
            <Button
              key={name}
              text={name}
              mode={name === value ? 'default' : 'ghost'}
              tone={name === value ? 'primary' : 'default'}
              fontSize={1}
              padding={2}
              onClick={() => update(name === value ? '' : name)}
            />
          ))}
        </Flex>
      ) : null}
    </Stack>
  )
}

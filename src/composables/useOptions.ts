export default function () {
  const options = shallowRef<Options>($options.value)

  $options.subscribe((newState) => {
    options.value = newState || optionsDefaults
  })

  return options
}

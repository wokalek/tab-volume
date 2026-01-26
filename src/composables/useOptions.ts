export default function () {
  const optionsRef = ref(_.cloneDeep($options.value))

  $options.subscribe((value) => {
    optionsRef.value = _.cloneDeep(value)
  })

  return optionsRef
}

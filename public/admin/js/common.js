function relizeJson(form) {
  var result = {}
  form.serializeArray().forEach(item => {
    result[item.name] = item.value
  })
  return result
}

export default function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = 'Enter the title';
  }
  if (!values.scale) {
    errors.scale = 'Enter musical scale';
  }
  if (!values.content) {
    errors.content = 'Enter some content';
  }

  return errors;
}

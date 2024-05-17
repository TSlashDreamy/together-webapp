interface ISearchField {
    search: string;
  }

export const validate = (values: ISearchField): { [key: string]: string } => {
  const errors: { [key: string]: string } = {};
  if (!values.search) {
    errors.search = "Search query can't be empty";
  }
  return errors;
};

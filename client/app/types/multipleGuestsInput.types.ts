export interface MultipleGuestsInputType {
  inputFields: { id: string }[];
  addGuestInputField: () => void;
  removeGuestInputField: (args: string) => void;
}

export const NetworkError=()=> Toast.show({
    text: "Unable to connect your network. Please check your connection and try again.",
    textStyle: { fontSize: 25, fontFamily: 'Avenir-Black', fontWeight: 'bold' },
    duration: 3000,
    buttonTextStyle: { fontSize: 15, fontFamily: 'Avenir-Black' },
    buttonText: "Okay",
    type: "danger"
  });
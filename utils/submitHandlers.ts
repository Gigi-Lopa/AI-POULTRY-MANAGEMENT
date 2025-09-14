export async function submitData(
  data: any,
  link: string,
  method?: string,
  onSuccess?: (response: any) => void,
  onError?: (error?: any) => void,
  onFinal?: () => void
) {
  try {
    const response = await fetch(`${process.env.EXPO_PUBLIC_IP_ADDRESS}${link}`, {
      method : method ? method : "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    });

    const result = await response.json();

    if (result?.success) {
      if (onSuccess) onSuccess(result);
    } else {
      if (onError) onError(result);
    }
  } catch (error) {
    console.error("Submit error:", error);
    if(onError) onError(error);
  } finally {
    if (onFinal) onFinal();
  }
}

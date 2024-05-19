import axios from "axios";

const url = "https://api.sber.ai/chat/v1/change-client-secret";
const headers = {
  Authorization: `Bearer eyJjdHkiOiJqd3QiLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwiYWxnIjoiUlNBLU9BRVAtMjU2In0.hSc8rYO0DsG_sWoPz-_nNoKy8G_bMR2SmpOlQdZl34pJn53BoQujMGGdkxDk_HVCyMUcx41uDZl-ldeaOqFcMLBVCAIIBeG0BzZaLEqdFjXQ57mVlBvcNygh2J3BXFTFWfjeqfMHsoLUz2o-l2eAdG5A-dNlkpGH1Q2BlHqq7o2zMupPrzghHxIwo0o1tZcjbamB172eCHDbrahhh3Yah5SHwkrYdXbBDjJw0Xej0Ix9W_QSNXQzBijIpsoICZKJav8PO0GMwikYrw-9OtRAk6wJJtsNehlh9LIzuRfNeHSbiFRNmOiv_vj6OzgY-BVz6C9WaHPm9GhDo26WVCjBsw.gUJ5HqUYTeRqasvo-oZ7Ew.DI224DTuj1gC8QCAoxVzo7FAXF9VgNLyG-KyaJTdndrWehK6leemugXgDo_dhTCTvZit-0BHQkL_RF9xk_2PZOAOxjis4gRDrODWdzKL4QZNTEfaYpczdX6EyKQwiFMM4nH8FhAL3224wPESPyVNFTmg-k8qzgyjoHM8ZLC184v3ZnO3DTgAZEXM5vjoke_GaKYXF7sSJF-jq3-4AUrZ4DE6k_RmdlNAIX7qTnP6R2uKHyW2p5YTs2X4heP6qTVrcr0zDKN1BSaHdRalWfCgTltDJuXfjLREtlbND_gyyYiErZnMIIHIT1bM_jypYCvQs8jLDzFQ4pTk5XjxIchWyQkgb6Bq9-CGWNMyjv8u2CKtuclt9fMuqiMKeBounYRknYBt5djmy51qec9XrW6okU-0LhzbH03CBkR4N4e_aaJTEYAlvhIfq3ZNCGmmknlV008eY3EqFiErtsU5iGlmlSB-Z9GFbLE25-gQfzg54r33ypgehpQl_JUBdNRTrHfoa0ZcqLsKp8BzId_oIwn0pwDYwSf8sIU1skzRpmL8q18E2kg1LOg4vRMJp1RaxMsTu8U8DeBRO7yqb65a7B2JYbR9MolEj2yqkrcEsQimAGnPMdsELGfeVlHjSGBtOwGfvdiMe_XTHYQegb-pqMWNfy1zbqMhgnj3OqCbGayhY0uPVV3kxhRhvlJXiFZKeYS7UulY5dlyamHCkXmDHFUg_nP8uAi1IFhh35gPZzPg0_s.W_WpEKsVq4NndvJqxJkuVkbxVHTNAJxbTflFe2F4pNo`,
};

axios
  .get(url, { headers })
  .then((response) => {
    if (response.status === 200) {
      const data = response.data;
      const clientSecret = data.client_secret;
      console.log(`Client secret: ${clientSecret}`);
    } else {
      console.log("Error getting client secret");
    }
  })
  .catch((error) => {
    console.error(error);
  });

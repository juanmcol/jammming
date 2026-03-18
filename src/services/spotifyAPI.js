// PKCE Authorizatiion Code Flow
async function getSpotifyToken () {
    const clientId = '7f1df52834d6433b83c2ee3978ba8cb4';
    const redirectUri = window.location.origin + window.location.pathname;
    const urlCheck = window.location.search.includes('code');
    
    if (urlCheck === false) {
        // Code Verifier
        // high-enrtopy crypographic random string, length 43 to 128
        const generateRandomString = (length) => {
            const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const values = crypto.getRandomValues(new Uint8Array(length));
            return values.reduce((acc, x) => acc + possible[x % possible.length], "");
        }

        const codeVerifier = generateRandomString(64);

        // Code Challenge
        // transform(hash) the code verifier using the SHA256 algorithm, value will be sent within the user authorization request.
        const sha256 = async(plain) => {
            const encoder = new TextEncoder();
            const data = encoder.encode(plain);
            return window.crypto.subtle.digest('SHA-256', data);
        }

        // return the base64 representation of the digest (calculated with the sha256 function).
        const base64encode = (input) => {
            return btoa(String.fromCharCode(...new Uint8Array(input)))
                .replace(/=/g, '')
                .replace(/\+/g, '-')
                .replace(/\//g, '_');
        }

        const hashed = await sha256(codeVerifier);
        const codeChallenge = base64encode(hashed);

        // Request User Authorization
        // Redirect to the Spotify authorization server login page by updating the window.location object value.
        // This allows the user to grant permissions to the application.
        const scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private';
        const authUrl = new URL("https://accounts.spotify.com/authorize");

        window.localStorage.setItem('code_verifier', codeVerifier);

        const params = {
            response_type: 'code',
            client_id: clientId,
            scope,
            code_challenge_method: 'S256',
            code_challenge: codeChallenge,
            redirect_uri: redirectUri,
        }

        authUrl.search = new URLSearchParams(params).toString();
        window.location.href = authUrl.toString();
    }
    
    if (localStorage.getItem('code_verifier') != null && localStorage.getItem('access_token') === null) {
        // Once the user accepts the requested permissions, the OAuth service redirects the user
        // back to the URL specified in the redirect_uri field.
        // Parse the url, to retrieve the code parameter, required for access token.
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        // Request An Access Token
        const codeVerifier = localStorage.getItem('code_verifier');
        
        const url = "https://accounts.spotify.com/api/token";
        const payload = {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                client_id: clientId,
                grant_type: 'authorization_code',
                code,
                redirect_uri: redirectUri,
                code_verifier: codeVerifier,
            }),
        }
    
        const body = await fetch(url, payload);
        const response = await body.json();

        if (response.access_token) {
            localStorage.setItem('access_token', response.access_token);
            localStorage.setItem('refresh_token', response.refresh_token);
            localStorage.removeItem('code_verifier');
            window.history.replaceState({}, document.title, redirectUri);
        }
    }
}

// use getToken, and then use the https://api.spotify.com/v1/search endpoint
// to search through the Spotify Catalogue (in the onClick handler for the search button).
export default getSpotifyToken;
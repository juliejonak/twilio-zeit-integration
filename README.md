# zeit-integration Setup

This ReadMe walkthrough process assumes that you have:

- Now CLI installed
- A Zeit repo
- A Twilio account with a valid SMS capable phone number

## 1. Install dependencies

Either using yarn or npm (just stay consistent)

```npm install```
```yarn```

## 2. Run the UiHook locally

In your terminal, run:

``` now dev -p 5005```

`5005` is the example, but you can choose a different number.

(Make sure whatever number your localhost is currently running
is always what you have in your Zeit Integration's settings.)

If you stop and re-start your integration locally and that
number is no longer available, now will automatically give
you a new one.

## 3. Create a Zeit Integration

Within your Zeit dashboard, under the tab `Integrations`,
at the bottom is a link to `Visit the Integrations Console`.

Once there, click the blue button `Create` to add a new custom
integration. You will need:

- A Name
- URL Slug
- Short description (will be seen in the marketplace explaining
what your integration is for)
- Logo
- Category
- Website
- Description
- At least one Feature Image
- A redirect URL (not necessary)
- Ui Hook URL (use the localhost link generated above)

Set your UI Hook URL to `http://localhost:5005` or the appropriate
link relating to your locally run integration.

## 4. Deploy to production

Back in your terminal, with your Now CLI, run:

```
now --target=production
```

This will create a live production version of your integration and
provide you with a URL of where it can be found, like so:

```
> Ready! Aliased to URL
```

Hang on to that URL. You're going to need it!

## 5. Add Your Integration to your account

Go to your integration in the marketplace and add it to your account.
This will allow you to use it within your dashboard and further
develop or debug.


## 6. Get Your Authorize URL

Within the `index.js` file, add in the `module.exports` function
a console.log of the `payload`. 

This object should return a field called `installationUrl` with a
corresponding URL. This is going to be the Authorize URL you'll use
when creating your Twilio Connect App.

It should look something like:

```
https://zeit.co/dashboard/integrations/icfg_wOPCpRYq5QgV0rNoVAPNaDIa
```

_Keep in mind:_ When console.logging, anything in your `index.js` will
appear in your terminal; anything in another file will appear in your
Zeit integration's logs, which can be found at:

```
https://zeit.co/deployments/YOUR-INTEGRATION-NAME.YOUR-ZEIT-USERNAME.now.sh/logs
```


## 7. Setup Your Twilio Connect App

Within your Twilio account, navigate to the Runtime area of the 
dashboard, indicated with `</>`, and then to `Connect Apps`.

Create a new Connect App. For this you will need:

- A logo
- Friendly name
- Company Name
- Description
- Homepage URL
- Terms of Service URL
- Authorize URL (use the URL pulled from the payload)
- DeAuthorize URL (use the same URL from the payload)

When choosing permissions, keep in mind that checking the box that allows
`Charge account for usage` will require users implementing this Zeit integration
to either sign up with a credit card or add a credit card to their existing
Twilio account if they don't yet have one on file.

Once your Twilio Connect App has been created, you will be given HTML code
for a connect button. Instead, just grab the App's SID, found at the top under 
`Properties` and `SID`. It should be roughly like so:

```
CNe6cf47e469390206f80becb70d94774f
```

## 8. Set Your Integration's Secrets

We need to add two secrets to your integration project - your personal
Twilio account auth token, and your Twilio Connect App's SID.

Using the Now CLI, set them like so:

``` now secret add twilio-app-sid NUMBER ```
``` now secret add twilio-auth-tok NUMBER ```

Now, we'll correspond ENV variables in the project to these secrets
with this command in the Now CLI:

```
now -e TWILIO_AUTH_TOK=@twilio-auth-tok -e TWILIO_APP_SID=@twilio-app-sid
```

Your integration should have been re-deployed with the secrets properly setup
and now run properly.


## Remind me - how does this work?

You, as the developer, set up a Twilio Connect App within your Twilio account. This
Integration uses that App SID for routing to the correct authorization link, as the 
ENV `TWILIO_APP_SID`.

You are also using your personal Twilio account Auth Token as a secret - this allows
you to facilitate setting up _other_ users' accounts through your Twilio Connect App.
In the Integration, `TWILIO_AUTH_TOK` and `metadata.twilioAuth` both refer to _your_
Twilio Auth Token to your account used to create the Twilio Connect App.

(If you're creating this as a team, only one team member needs to set up the Twilio
Connect App and use their token.)

When the user has successfully authenticated and connected their Twilio account,
Twilio returns the user to your Integration with _their_ Twilio SID as a query param,
that is then being saved as `metadata.userTwilioSID`. This refers to the _user's_ SID
and allows them to use Twilio.

Typically, when calling the Twilio helper library, a user would use their SID and Auth
Token from their account; but when we help other users setup their accounts, we can
also call Twilio's helper library by creating a client with the user's SID and our
Auth Token, like so:

```
const twilio = require('twilio');
const client = new twilio(metadata.userTwilioSID, TWILIO_AUTH_TOK);
```


## Gotchas!

We hit some common issues when developing this integration that you might as well.
If you're having difficulty, check that none of these issues is the root of your error.


##### Incorrect Syntax in the htm element

Zeit's htm element does not use the standard HTML tag elements - some of the capitalization
and interaction is different. For a list of what you can use, see here:

https://zeit.co/docs/integrations/v2/#creating-user-interfaces/component-catalog


##### But where are the logs??

Remember, if you're logging or hitting an error that stems from your `index.js` file, that
will appear in your terminal. You also can just wait for your local build to re-build when
you make changes to your `index.js` file.

However, when you make changes to any _other_ files, you will need to re-deploy:

```
now --target=production
```

All other files will log into the Zeit dashboard log found at:

```
https://zeit.co/deployments/YOUR-INTEGRATION-NAME.YOUR-ZEIT-USERNAME.now.sh/logs
```


##### I'm getting strange errors with Twilio

Double check that your SID and Auth Tok credentials are logging correctly from
the ENV variables. If not, you may need to reset the secrets in the Now CLI.


##### I can't see anything on my localhost or in the Zeit dashboard

Make sure you aren't using Safari. Zeit Integration currently does not perform
on Safari - in the dashboard or in browser.

Remember, your localhost link will always return a 404. You can only view your
integration in the Zeit dashboard.
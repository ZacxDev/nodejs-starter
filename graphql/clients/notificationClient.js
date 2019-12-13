import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import gql from 'graphql-tag';
import { onError } from 'apollo-link-error';
import fetch from 'cross-fetch';

const httpLink = new HttpLink({
  uri: env.NOTIFICATION_API_ENDPOINT,
  fetch
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    }
    );
  }
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const apolloClient = new ApolloClient({
  link: errorLink.concat(httpLink),
  cache: new InMemoryCache()
});

const sendEmail = async payload => {
  const query = gql`
    query NotificationAPI($payload: String!) {
      sendEmail(payload: $payload)
    }
  `;
  await apolloClient.query({
    query,
    fetchPolicy: 'network-only',
    variables: {
      payload: JSON.stringify(payload)
    }
  });
};

const sendBookingCreatedNotifications = async ({
  customerEmail,
  customerName,
  locationName,
  businessName,
  appointmentDate,
  bookingStartTime,
  merchantEmail,
  merchantName
}) => {
  await sendEmail({
    to: customerEmail,
    subject: '[Mobl] Appointment Booked!',
    template: 'email-booking-created-customer',
    templateData: {
      fullName: customerName,
      location: locationName,
      company: businessName,
      date: appointmentDate,
      time: bookingStartTime
    }
  });

  await sendEmail({
    to: merchantEmail,
    subject: '[Mobl] A New Booking Was Created!',
    template: 'email-booking-created-merchant',
    templateData: {
      fullName: merchantName,
      location: locationName,
      company: businessName,
      date: appointmentDate,
      time: bookingStartTime
    }
  });
};

export default {
  sendEmail,
  sendBookingCreatedNotifications
};

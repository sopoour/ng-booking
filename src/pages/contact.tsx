import EmailCopy from '@app/components/EmailCopy';
import Typography from '@app/components/Typography/Typography';
import useLang from '@app/hooks/useLang';
import { flexColumn, flexRow } from '@app/styles/mixins';
import { Checkbox, Group, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { FC, useState } from 'react';
import styled from 'styled-components';
import theme from '@app/styles/theme';
import SeoHead from '@app/components/SeoHead';
import MaxWidthContainer from '@app/components/MaxWidthContainer';
import fonts from '@app/fonts/fonts';

const FormContainer = styled.form`
  ${flexColumn};
  gap: 16px;
  padding: 32px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.bg.soft};
  width: 100%;
  margin: 0 auto;

  label {
    margin-bottom: 8px;
    color: ${({ theme }) => theme.colors.fg.default};
  }

  ${({ theme }) => theme.media('sm')`
    width: 65%;
  `}

  ${({ theme }) => theme.media('md')`
    width: 55%;
  `}
`;

const EmailContact = styled.span`
  ${flexColumn};
  gap: 4px;
  justify-content: center;
  align-items: center;
  margin-top: 8px;

  ${({ theme }) => theme.media('xs')`
    ${flexRow};
  `}
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.bg.default};
  color: white;
  font-family: ${fonts.subheader.style.fontFamily};
  padding: 4px 8px;
  font-size: 14px;
  width: 100%;
  text-align: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.bg.defaultBlur};
  }

  ${({ theme }) => theme.media('sm')`
    font-size: 16px;
    padding: 8px 16px;
  `}
`;

const Contact: FC = () => {
  const lang = useLang();

  const labels = () => {
    switch (lang) {
      case 'en':
        return {
          name: 'Name',
          namePlaceholder: 'Your name',
          email: 'Email',
          emailPlaceholder: 'you@example.com',
          message: 'Message',
          messagePlaceholder: 'Write your message...',
          checkbox:
            'I agree that this data may be stored and processed for the purpose of contacting me. I am aware that I can withdraw my consent at any time.',
          sent: 'Message sent successfully!',
          error: 'Something went wrong. Please try again.',
          sideNote: 'Or reach us at',
        };
      case 'de':
        return {
          name: 'Name',
          namePlaceholder: 'Dein Name',
          email: 'E-Mail',
          emailPlaceholder: 'name@beispiel.com',
          message: 'Nachricht',
          messagePlaceholder: 'Schreibe eine Nachricht...',
          checkbox:
            'Ich bin damit einverstanden, dass diese Daten zum Zweck der Kontaktaufnahme gespeichert und verarbeitet werden. Mir ist bekannt, dass ich meine Einwilligung jederzeit widerrufen kann.',
          sent: 'Nachricht erfolgreich gesendet!',
          error: 'Etwas ist schief gelaufen. Bitte versuche es noch einmal.',
          sideNote: 'Oder erreiche uns unter',
        };
      default:
        return {
          name: 'Name',
          email: 'E-Mail',
          message: 'Nachricht',
          checkbox:
            'Ich bin damit einverstanden, dass diese Daten zum Zweck der Kontaktaufnahme gespeichert und verarbeitet werden. Mir ist bekannt, dass ich meine Einwilligung jederzeit widerrufen kann.',
          sent: 'Nachricht erfolgreich gesendet!',
          error: 'Etwas ist schief gelaufen. Bitte versuche es noch einmal.',
          sideNote: 'Oder erreiche uns unter',
        };
    }
  };

  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      message: '',
      gdpr: false,
    },

    validate: {
      name: (value) =>
        value.trim().length > 0
          ? null
          : lang === 'en'
            ? 'Name is required'
            : 'Name ist erforderlich',
      email: (value) =>
        /^\S+@\S+$/.test(value)
          ? null
          : lang === 'en'
            ? 'Invalid email'
            : 'Ungültige E-Mail Adresse',
      message: (value) =>
        value.trim().length > 10
          ? null
          : lang === 'en'
            ? 'Message must be at least 10 characters'
            : 'Nachricht muss mindestens 10 Zeichen beinhalten',
      gdpr: (value) =>
        value
          ? null
          : lang === 'en'
            ? 'You must agree to the GDPR terms'
            : 'Bitte stimme den DSGVO- Bedingungen zu!',
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        setStatus('sent');
        form.reset();
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <>
      <SeoHead title="Feedback | BENGE" />
      <MaxWidthContainer id="feedback">
        <>
          <Typography
            type={fonts.header.style.fontFamily}
            fontSize="40px"
            fontSizeSm="60px"
            $textalign="center"
            style={{ marginBottom: '32px' }}
          >
            {lang === 'en' ? 'Contact' : 'Kontakt'}
          </Typography>
          <FormContainer onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              label="Name"
              placeholder={labels().namePlaceholder}
              {...form.getInputProps('name')}
              withAsterisk
              size="md"
              radius="md"
              key={form.key('name')}
            />
            <TextInput
              label={labels().email}
              placeholder={labels().emailPlaceholder}
              {...form.getInputProps('email')}
              withAsterisk
              size="md"
              radius="md"
              key={form.key('email')}
            />
            <Textarea
              label={labels().message}
              placeholder={labels().messagePlaceholder}
              minRows={4}
              autosize
              {...form.getInputProps('message')}
              withAsterisk
              size="md"
              radius="md"
            />
            <Checkbox
              label={labels().checkbox}
              color={theme.colors.bg.default}
              {...form.getInputProps('gdpr', { type: 'checkbox' })}
            />
            <Group mt="md">
              <Button>{lang === 'en' ? 'Send' : 'Senden'}</Button>
            </Group>
            {status === 'sent' && (
              <Typography
                type={fonts.text.style.fontFamily}
                $textalign="center"
                style={{ fontStyle: 'italic' }}
                fontWeight={500}
              >
                {labels().sent}
              </Typography>
            )}
            {status === 'error' && (
              <Typography
                type={fonts.text.style.fontFamily}
                color="red"
                $textalign="center"
                style={{ fontStyle: 'italic' }}
                fontWeight={500}
              >
                {labels().error}
              </Typography>
            )}
            <EmailContact>
              <Typography fontWeight={600} as="h3" fontSize="18px">
                {labels().sideNote}:
              </Typography>
              <EmailCopy email="contact@ng-booking.de" />
            </EmailContact>
          </FormContainer>
        </>
      </MaxWidthContainer>
    </>
  );
};

export default Contact;

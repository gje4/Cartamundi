'use client';

import { useTranslations } from 'next-intl';
import { useFormStatus } from 'react-dom';

import { Button } from '~/components/ui/button';

export const RemoveFromCartButton = () => {
  const { pending } = useFormStatus();
  const t = useTranslations('Cart.SubmitRemoveItem');

  return (
    <Button
      className="st_cart_button w-auto items-center p-0 text-primary"
      loading={pending}
      size={"cart_small"}
      loadingText={t('spinnerText')}
      type="submit"
        // @ts-ignore
      variant="subtle"
    >
      {t('remove')}
    </Button>
  );
};

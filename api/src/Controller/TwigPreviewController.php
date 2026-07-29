<?php

declare(strict_types=1);

namespace App\Controller;

use App\Catalog\AssessmentCatalog;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Twig\Environment;

final readonly class TwigPreviewController
{
    public function __construct(
        private AssessmentCatalog $catalog,
        private Environment $twig,
    ) {
    }

    #[Route('/twig-preview', name: 'twig_preview', methods: ['GET'])]
    public function __invoke(): Response
    {
        $data = $this->catalog->getData();

        return new Response($this->twig->render('twig-preview/index.html.twig', [
            'casinos' => $data['casinos'],
        ]));
    }
}

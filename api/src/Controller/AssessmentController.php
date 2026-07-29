<?php

declare(strict_types=1);

namespace App\Controller;

use App\Catalog\AssessmentCatalog;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

final readonly class AssessmentController
{
    public function __construct(private AssessmentCatalog $catalog)
    {
    }

    #[Route('/api/assessment', name: 'api_assessment', methods: ['GET'])]
    public function __invoke(): JsonResponse
    {
        return new JsonResponse($this->catalog->getData());
    }
}

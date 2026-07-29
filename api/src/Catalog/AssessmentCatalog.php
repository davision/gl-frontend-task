<?php

declare(strict_types=1);

namespace App\Catalog;

use JsonException;
use RuntimeException;
use Symfony\Component\DependencyInjection\Attribute\Autowire;

final readonly class AssessmentCatalog
{
    public function __construct(
        #[Autowire('%kernel.project_dir%/resources/data/assessment.json')]
        private string $catalogPath,
    ) {
    }

    /**
     * @return array{questions: list<mixed>, casinos: list<mixed>}
     */
    public function getData(): array
    {
        if (!is_readable($this->catalogPath)) {
            throw new RuntimeException(sprintf('Assessment data is not readable: %s', $this->catalogPath));
        }

        $contents = file_get_contents($this->catalogPath);

        if ($contents === false) {
            throw new RuntimeException(sprintf('Assessment data could not be loaded: %s', $this->catalogPath));
        }

        try {
            $data = json_decode($contents, true, flags: JSON_THROW_ON_ERROR);
        } catch (JsonException $exception) {
            throw new RuntimeException('Assessment data contains invalid JSON.', previous: $exception);
        }

        if (
            !is_array($data)
            || !isset($data['questions'], $data['casinos'])
            || !is_array($data['questions'])
            || !is_array($data['casinos'])
        ) {
            throw new RuntimeException('Assessment data must contain questions and casinos arrays.');
        }

        return [
            'questions' => array_values($data['questions']),
            'casinos' => array_values($data['casinos']),
        ];
    }
}

<?php

declare(strict_types=1);

namespace App\Tests\Api;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

final class AssessmentControllerTest extends WebTestCase
{
    public function testHealthEndpointIsAvailable(): void
    {
        $client = self::createClient();
        $client->request('GET', '/api/health');

        self::assertResponseIsSuccessful();
        self::assertJsonStringEqualsJsonString(
            '{"status":"ok"}',
            (string) $client->getResponse()->getContent(),
        );
    }

    public function testAssessmentEndpointReturnsQuestionsAndCasinos(): void
    {
        $client = self::createClient();
        $client->request('GET', '/api/assessment');

        self::assertResponseIsSuccessful();

        /** @var array{questions: list<mixed>, casinos: list<mixed>} $payload */
        $payload = json_decode(
            (string) $client->getResponse()->getContent(),
            true,
            flags: JSON_THROW_ON_ERROR,
        );

        self::assertCount(4, $payload['questions']);
        self::assertCount(4, $payload['casinos']);
        self::assertSame('experience', $payload['questions'][0]['id']);
        self::assertSame('north-star', $payload['casinos'][0]['id']);
    }

    public function testTwigPreviewIsAvailable(): void
    {
        $client = self::createClient();
        $client->request('GET', '/twig-preview');

        self::assertResponseIsSuccessful();
        self::assertSelectorTextContains('h1', 'Build the Twig bonus cards.');
    }
}
